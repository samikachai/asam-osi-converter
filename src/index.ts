import type { Color } from "@foxglove/schemas";
import { LinePrimitive, KeyValuePair, Vector2 } from "@foxglove/schemas";
import { Time } from "@foxglove/schemas/schemas/typescript/Time";
import { ExtensionContext } from "@foxglove/studio";

import {
  HOST_OBJECT_COLOR,
  LANE_BOUNDARY_COLOR,
  MOVING_OBJECT_COLOR,
  STATIONARY_OBJECT_COLOR,
} from "./config";
import { preloadDynamicTextures, buildTrafficSignModel } from "./trafficsigns";
import {
  OsiGroundTruth,
  OsiObject,
  OsiTimestamp,
  OsiLaneBoundary,
  OsiLaneBoundaryType,
  OsiMovingObjectType,
  OsiMovingObjectVehicleClassification,
  OsiMovingObjectVehicleClassificationType,
  OsiMovingObjectVehicleClassificationLightStateBrakeLightState,
  OsiMovingObjectVehicleClassificationLightStateIndicatorState,
  OsiMovingObjectVehicleClassificationLightStateGenericLightState,
  OsiIdentifier,
  OsiTrafficSign,
} from "./types/osiGroundTruth";
import {
  pointListToLinePrimitive,
  pointListToDashedLinePrimitive,
  objectToCubePrimitive,
} from "./utils/marker";
import { PartialSceneEntity } from "./utils/scene";

const ROOT_FRAME = "<root>";

function buildObjectEntity(
  osiObject: OsiObject,
  color: Color,
  id_prefix: string,
  frame_id: string,
  time: Time,
  metadata?: KeyValuePair[],
): PartialSceneEntity {
  // Reference is center of object box.
  const x_offset = 0;
  const y_offset = 0;

  const cube = objectToCubePrimitive(
    osiObject.base.position.x,
    osiObject.base.position.y,
    osiObject.base.orientation.yaw,
    x_offset,
    y_offset,
    osiObject.base.dimension.width,
    osiObject.base.dimension.length,
    osiObject.base.dimension.height,
    color,
  );

  return {
    timestamp: time,
    frame_id,
    id: id_prefix + osiObject.id.value.toString(),
    lifetime: { sec: 0, nsec: 0 },
    frame_locked: true,
    cubes: [cube],
    metadata,
  };
}

function buildTrafficSignEntity(
  obj: OsiTrafficSign,
  id_prefix: string,
  frame_id: string,
  time: Time,
  metadata?: KeyValuePair[],
): PartialSceneEntity {
  const models = [];

  models.push(buildTrafficSignModel("main", obj.main_sign));

  if (obj.supplementary_sign.length > 0) {
    for (const item of obj.supplementary_sign) {
      models.push(buildTrafficSignModel("main", item));
    }
  }

  return {
    timestamp: time,
    frame_id,
    id: id_prefix + obj.id.value.toString(),
    lifetime: { sec: 0, nsec: 0 },
    frame_locked: true,
    // texts,
    models,
    metadata,
  };
}

function buildLaneBoundaryEntity(
  osiLaneBoundary: OsiLaneBoundary,
  frame_id: string,
  time: Time,
): PartialSceneEntity {
  const boundaryPoints = osiLaneBoundary.boundary_line.map(
    (point) => ({ x: point.position.x, y: point.position.y }) as Vector2,
  );

  const color = LANE_BOUNDARY_COLOR[osiLaneBoundary.classification.type.value];
  let line: LinePrimitive;
  switch (osiLaneBoundary.classification.type.value) {
    case OsiLaneBoundaryType.DASHED_LINE:
      line = pointListToDashedLinePrimitive(
        osiLaneBoundary.boundary_line.map((point) => point.position),
        1,
        2.5,
        osiLaneBoundary.boundary_line[0]?.width ?? 0,
        color,
      );
      break;
    case OsiLaneBoundaryType.BOTTS_DOTS:
      line = pointListToDashedLinePrimitive(
        osiLaneBoundary.boundary_line.map((point) => point.position),
        0.1,
        1,
        osiLaneBoundary.boundary_line[0]?.width ?? 0,
        color,
      );
      break;
    default:
      line = pointListToLinePrimitive(
        boundaryPoints,
        osiLaneBoundary.boundary_line[0]?.width ?? 0,
        color,
      );
      break;
  }
  const metadata = buildLaneBoundaryMetadata(osiLaneBoundary);

  return {
    timestamp: time,
    frame_id,
    id: "boundary_" + osiLaneBoundary.id.value.toString(),
    lifetime: { sec: 0, nsec: 0 },
    frame_locked: true,
    lines: [line],
    metadata,
  };
}

interface IlightStateEnumStringMaps {
  generic_light_state: typeof OsiMovingObjectVehicleClassificationLightStateGenericLightState;
  [key: string]: Record<number, string>;
}

const lightStateEnumStringMaps: IlightStateEnumStringMaps = {
  indicator_state: OsiMovingObjectVehicleClassificationLightStateIndicatorState,
  brake_light_state: OsiMovingObjectVehicleClassificationLightStateBrakeLightState,
  generic_light_state: OsiMovingObjectVehicleClassificationLightStateGenericLightState,
};

export function buildVehicleMetadata(
  vehicle_classification: OsiMovingObjectVehicleClassification,
): KeyValuePair[] {
  return [
    {
      key: "type",
      value: OsiMovingObjectVehicleClassificationType[vehicle_classification.type.value],
    },
    ...Object.entries(vehicle_classification.light_state).map(
      ([key, { value }]: [string, OsiIdentifier]) => {
        return {
          key: `light_state.${key}`,
          value:
            lightStateEnumStringMaps[key]?.[value] ??
            lightStateEnumStringMaps.generic_light_state[value]!,
        };
      },
    ),
  ];
}

export function buildLaneBoundaryMetadata(lane_boundary: OsiLaneBoundary): KeyValuePair[] {
  const metadata: KeyValuePair[] = [
    {
      key: "type",
      value: OsiLaneBoundaryType[lane_boundary.classification.type.value],
    },
    {
      key: "width",
      value: lane_boundary.boundary_line[0]?.width.toString() ?? "0",
    },
  ];

  return metadata;
}

function osiTimestampToTime(time: OsiTimestamp): Time {
  return {
    sec: time.seconds,
    nsec: time.nanos,
  };
}

const staticObjectsRenderCache: {
  lastRenderTime: Time | undefined;
  lastRenderedObjects: Set<number>;
} = {
  lastRenderTime: undefined,
  lastRenderedObjects: new Set<number>(),
};

export function determineTheNeedToRerender(lastRenderTime: Time, currentRenderTime: Time): boolean {
  return (
    lastRenderTime.sec > currentRenderTime.sec ||
    (lastRenderTime.sec === currentRenderTime.sec && lastRenderTime.nsec > currentRenderTime.nsec)
  );
}

function buildSceneEntities(osiGroundTruth: OsiGroundTruth): PartialSceneEntity[] {
  let sceneEntities: PartialSceneEntity[] = [];
  const time: Time = osiTimestampToTime(osiGroundTruth.timestamp);
  const needtoRerender =
    staticObjectsRenderCache.lastRenderTime !== undefined &&
    determineTheNeedToRerender(staticObjectsRenderCache.lastRenderTime, time);

  // Moving objects
  const movingObjectSceneEntities = osiGroundTruth.moving_object.map((obj) => {
    let entity;
    if (obj.id.value === osiGroundTruth.host_vehicle_id.value) {
      const metadata = buildVehicleMetadata(obj.vehicle_classification);
      entity = buildObjectEntity(obj, HOST_OBJECT_COLOR, "", ROOT_FRAME, time, metadata);
    } else {
      const objectType = OsiMovingObjectType[obj.type.value];
      const objectColor = MOVING_OBJECT_COLOR[obj.type.value];
      const prefix = `moving_object_${objectType}_`;
      const metadata =
        obj.type.value === OsiMovingObjectType.VEHICLE
          ? buildVehicleMetadata(obj.vehicle_classification)
          : [];
      entity = buildObjectEntity(obj, objectColor, prefix, ROOT_FRAME, time, metadata);
    }
    return entity;
  });

  sceneEntities = sceneEntities.concat(movingObjectSceneEntities);

  // Stationary objects
  const stationaryObjectSceneEntities = osiGroundTruth.stationary_object.map((obj) => {
    return buildObjectEntity(obj, STATIONARY_OBJECT_COLOR, "stationary_object_", ROOT_FRAME, time);
  });
  sceneEntities = sceneEntities.concat(stationaryObjectSceneEntities);

  // Traffic Sign objects
  let filteredTrafficSigns: OsiTrafficSign[];
  if (needtoRerender) {
    staticObjectsRenderCache.lastRenderedObjects.clear();
    filteredTrafficSigns = osiGroundTruth.traffic_sign;
  } else {
    filteredTrafficSigns = osiGroundTruth.traffic_sign.filter((obj) => {
      return !staticObjectsRenderCache.lastRenderedObjects.has(obj.id.value) || needtoRerender;
    });
  }
  const trafficsignObjectSceneEntities = filteredTrafficSigns.map((obj) => {
    staticObjectsRenderCache.lastRenderedObjects.add(obj.id.value);
    return buildTrafficSignEntity(obj, "traffic_sign_", ROOT_FRAME, time);
  });
  staticObjectsRenderCache.lastRenderTime = time;
  sceneEntities = sceneEntities.concat(trafficsignObjectSceneEntities);

  // Lane boundaries
  const laneBoundarySceneEntities = osiGroundTruth.lane_boundary.map((lane_boundary) => {
    return buildLaneBoundaryEntity(lane_boundary, ROOT_FRAME, time);
  });
  sceneEntities = sceneEntities.concat(laneBoundarySceneEntities);

  return sceneEntities;
}

export function activate(extensionContext: ExtensionContext): void {
  preloadDynamicTextures();

  extensionContext.registerMessageConverter({
    fromSchemaName: "osi_3_msgs/osi_GroundTruth",
    toSchemaName: "foxglove.SceneUpdate",
    converter: (osiGroundTruth: OsiGroundTruth) => {
      console.log("Converting OSI Groundtruth entities");
      let sceneEntities: PartialSceneEntity[] = [];

      try {
        sceneEntities = buildSceneEntities(osiGroundTruth);
      } catch (error) {
        console.error(
          "OsiGroundTruthVisualizer: Error during message conversion:\n%s\nSkipping message! (Input message not compatible?)",
          error,
        );
      }
      return {
        deletions: [],
        entities: sceneEntities,
      };
    },
  });
}

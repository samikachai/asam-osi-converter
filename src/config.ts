import { Color } from '@foxglove/schemas';
import { ColorCode } from '@utils/helper';
import {
  OsiLaneBoundaryType,
  OsiMovingObjectType,
  StationaryObjectColor,
  StationaryObjectType,
  StationaryObjectMaterial,
  StationaryObjectDensity,
} from './types/osiGroundTruth';

//// COLOR CONFIG ////

export const HOST_OBJECT_COLOR: Color = ColorCode('b', 0.5);
export const MOVING_OBJECT_COLOR: Record<OsiMovingObjectType, Color> = {
  [OsiMovingObjectType.UNKNOWN]: ColorCode('gray', 0.5),
  [OsiMovingObjectType.OTHER]: ColorCode('c', 0.5),
  [OsiMovingObjectType.VEHICLE]: ColorCode('r', 0.5),
  [OsiMovingObjectType.PEDESTRIAN]: ColorCode('y', 0.5),
  [OsiMovingObjectType.ANIMAL]: ColorCode('g', 0.5),
};

export const LANE_BOUNDARY_COLOR: Record<OsiLaneBoundaryType, Color> = {
  [OsiLaneBoundaryType.BOTTS_DOTS]: ColorCode('y', 0.5),
  [OsiLaneBoundaryType.CURB]: ColorCode('c', 0.5),
  [OsiLaneBoundaryType.DASHED_LINE]: ColorCode('gray', 0.5),
  [OsiLaneBoundaryType.GRASS_EDGE]: ColorCode('g', 0.5),
  [OsiLaneBoundaryType.GRAVEL_EDGE]: ColorCode('m', 0.5),
  [OsiLaneBoundaryType.GUARD_RAIL]: ColorCode('gray', 0.5),
  [OsiLaneBoundaryType.NO_LINE]: ColorCode('r', 0.1),
  [OsiLaneBoundaryType.OTHER]: ColorCode('gray', 0.5),
  [OsiLaneBoundaryType.ROAD_EDGE]: ColorCode('b', 0.5),
  [OsiLaneBoundaryType.SNOW_EDGE]: ColorCode('w', 0.5),
  [OsiLaneBoundaryType.SOIL_EDGE]: ColorCode('y', 0.5),
  [OsiLaneBoundaryType.SOLID_LINE]: ColorCode('gray', 0.5),
  [OsiLaneBoundaryType.STRUCTURE]: ColorCode('c', 0.5),
  [OsiLaneBoundaryType.UNKNOWN]: ColorCode('gray', 0.5),
};

//// STATIONARY OBJECT MAPPING ////

export const STATIONARY_OBJECT_COLOR: Record<StationaryObjectColor, { code: Color; name: string }> = {
  [StationaryObjectColor.OTHER]: { code: ColorCode('c', 0.5), name: 'Other' },
  [StationaryObjectColor.YELLOW]: { code: ColorCode('y', 0.5), name: 'Yellow' },
  [StationaryObjectColor.GREEN]: { code: ColorCode('g', 0.5), name: 'Green' },
  [StationaryObjectColor.BLUE]: { code: ColorCode('b', 0.5), name: 'Blue' },
  [StationaryObjectColor.VIOLET]: { code: ColorCode('m', 0.5), name: 'Violet' },
  [StationaryObjectColor.RED]: { code: ColorCode('r', 0.5), name: 'Red' },
  [StationaryObjectColor.ORANGE]: { code: ColorCode('orange', 0.5), name: 'Orange' },
  [StationaryObjectColor.BLACK]: { code: ColorCode('black', 0.5), name: 'Black' },
  [StationaryObjectColor.GREY]: { code: ColorCode('gray', 0.5), name: 'Grey' },
  [StationaryObjectColor.WHITE]: { code: ColorCode('w', 0.5), name: 'White' },
  [StationaryObjectColor.UNKNOWN]: { code: ColorCode('gray', 0.5), name: 'Unknown' },
};

export const STATIONARY_OBJECT_TYPE = {
  [StationaryObjectType.UNKNOWN]: 'Type of the object is unknown (must not be used in ground truth).',
  [StationaryObjectType.OTHER]: 'Other (unspecified but known) type of object.',
  [StationaryObjectType.BRIDGE]: 'Object is a bridge.',
  [StationaryObjectType.BUILDING]: 'Object is a building.',
  [StationaryObjectType.POLE]: 'Object is a pole (e.g. from a traffic light).',
  [StationaryObjectType.PYLON]: 'Object is a pylon.',
  [StationaryObjectType.DELINEATOR]: 'Object is a delineator (e.g. at a construction site).',
  [StationaryObjectType.TREE]: 'Object is a tree.',
  [StationaryObjectType.BARRIER]: 'Object is a barrier.',
  [StationaryObjectType.VEGETATION]: 'Object is vegetation.',
  [StationaryObjectType.CURBSTONE]: 'Object is a curbstone.',
  [StationaryObjectType.WALL]: 'TYPE_WALL',
  [StationaryObjectType.VERTICAL_STRUCTURE]: 'Landmarks corresponding to vertical structures in the environment.',
  [StationaryObjectType.RECTANGULAR_STRUCTURE]:
    'Landmarks corresponding to rectangular structures in the environment, like walls.',
  [StationaryObjectType.OVERHEAD_STRUCTURE]:
    'Landmarks corresponding to overhead structures in the environment, like sign bridges.',
  [StationaryObjectType.REFLECTIVE_STRUCTURE]:
    'Landmarks corresponding to reflective structures in the environment, like reflective poles on the road boarder.',
  [StationaryObjectType.CONSTRUCTION_SITE_ELEMENT]:
    'Landmarks corresponding to construction site elements in the environment, like beacons.',
  [StationaryObjectType.SPEED_BUMP]: 'Object is a speed bump.',
  [StationaryObjectType.EMITTING_STRUCTURE]:
    'Landmarks corresponding to sources of electromagnetic waves in the environment, like street lights.',
};

export const STATIONARY_OBJECT_MATERIAL = {
  [StationaryObjectMaterial.UNKNOWN]: 'Type of the material is unknown (must not be used in ground truth).',
  [StationaryObjectMaterial.OTHER]: 'Other (unspecified but known) type of material.',
  [StationaryObjectMaterial.WOOD]: 'Wooden structure.',
  [StationaryObjectMaterial.PLASTIC]: 'Plastic structure.',
  [StationaryObjectMaterial.CONCRETE]: 'Concrete structure.',
  [StationaryObjectMaterial.METAL]: 'Metal structure.',
  [StationaryObjectMaterial.STONE]: 'Natural stone structure.',
  [StationaryObjectMaterial.GLAS]: 'Glas structure.',
  [StationaryObjectMaterial.MUD]: 'Mud structure.',
};

export const STATIONARY_OBJECT_DENSITY = {
  [StationaryObjectDensity.UNKNOWN]: 'Type of the material density is unknown (must not be used in ground truth).',
  [StationaryObjectDensity.OTHER]: 'Other (unspecified but known) type of material density.',
  [StationaryObjectDensity.SOLID]: 'No perforation - solid;.',
  [StationaryObjectDensity.SMALL_MESH]: 'Perforation max.]0; 100] mm',
  [StationaryObjectDensity.MEDIAN_MESH]: 'Perforation max.]100; 500] mm',
  [StationaryObjectDensity.LARGE_MESH]: 'Perforation max. ]500; 5000] mm',
  [StationaryObjectDensity.OPEN]: 'Perforation max. ]5000; infinity[ mm',
};
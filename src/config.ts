import { Color } from "@foxglove/schemas";

import { OsiLaneBoundaryType, OsiMovingObjectType } from "./types/osiGroundTruth";
import { ColorCode } from "./utils/helper";

//// COLOR CONFIG ////

export const HOST_OBJECT_COLOR: Color = ColorCode("b", 0.5);
export const MOVING_OBJECT_COLOR: Record<OsiMovingObjectType, Color> = {
  [OsiMovingObjectType.UNKNOWN]: ColorCode("gray", 0.5),
  [OsiMovingObjectType.OTHER]: ColorCode("c", 0.5),
  [OsiMovingObjectType.VEHICLE]: ColorCode("r", 0.5),
  [OsiMovingObjectType.PEDESTRIAN]: ColorCode("y", 0.5),
  [OsiMovingObjectType.ANIMAL]: ColorCode("g", 0.5),
};
export const STATIONARY_OBJECT_COLOR: Color = ColorCode("gray", 0.5);
export const LANE_BOUNDARY_COLOR: Record<OsiLaneBoundaryType, Color> = {
  [OsiLaneBoundaryType.BOTTS_DOTS]: ColorCode("y", 0.5),
  [OsiLaneBoundaryType.CURB]: ColorCode("c", 0.5),
  [OsiLaneBoundaryType.DASHED_LINE]: ColorCode("gray", 0.5),
  [OsiLaneBoundaryType.GRASS_EDGE]: ColorCode("g", 0.5),
  [OsiLaneBoundaryType.GRAVEL_EDGE]: ColorCode("m", 0.5),
  [OsiLaneBoundaryType.GUARD_RAIL]: ColorCode("gray", 0.5),
  [OsiLaneBoundaryType.NO_LINE]: ColorCode("r", 0.1),
  [OsiLaneBoundaryType.OTHER]: ColorCode("gray", 0.5),
  [OsiLaneBoundaryType.ROAD_EDGE]: ColorCode("b", 0.5),
  [OsiLaneBoundaryType.SNOW_EDGE]: ColorCode("w", 0.5),
  [OsiLaneBoundaryType.SOIL_EDGE]: ColorCode("y", 0.5),
  [OsiLaneBoundaryType.SOLID_LINE]: ColorCode("gray", 0.5),
  [OsiLaneBoundaryType.STRUCTURE]: ColorCode("c", 0.5),
  [OsiLaneBoundaryType.UNKNOWN]: ColorCode("gray", 0.5),
};

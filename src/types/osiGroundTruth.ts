export enum OsiLaneBoundaryClassificationType {
  TYPE_UNKNOWN = 0,
  TYPE_OTHER = 1,
  TYPE_DRIVING = 2,
  TYPE_NONDRIVING = 3,
  TYPE_INTERSECTION = 4,
}

export enum OsiMovingObjectType {
  UNKNOWN = 0,
  OTHER = 1,
  VEHICLE = 2,
  PEDESTRIAN = 3,
  ANIMAL = 4,
}

export enum OsiMovingObjectVehicleClassificationType {
  UNKNOWN = 0,
  OTHER = 1,
  SMALL_CAR = 2,
  COMPACT_CAR = 3,
  MEDIUM_CAR = 4,
  LUXURY_CAR = 5,
  DELIVERY_VAN = 6,
  HEAVY_TRUCK = 7,
  SEMITRACTOR = 16,
  SEMITRAILER = 8,
  TRAILER = 9,
  MOTORBIKE = 10,
  BICYCLE = 11,
  BUS = 12,
  TRAM = 13,
  TRAIN = 14,
  WHEELCHAIR = 15,
  STANDUP_SCOOTER = 17,
}

export enum OsiMovingObjectVehicleClassificationLightStateIndicatorState {
  UNKNOWN = 0,
  OTHER = 1,
  OFF = 2,
  LEFT = 3,
  RIGHT = 4,
  WARNING = 5,
}

export enum OsiMovingObjectVehicleClassificationLightStateGenericLightState {
  UNKNOWN = 0,
  OTHER = 1,
  OFF = 2,
  ON = 3,
  FLASHING_BLUE = 4,
  FLASHING_BLUE_AND_RED = 5,
  FLASHING_AMBER = 6,
}

export enum OsiMovingObjectVehicleClassificationLightStateBrakeLightState {
  UNKNOWN = 0,
  OTHER = 1,
  OFF = 2,
  NORMAL = 3,
  STRONG = 4,
}

export enum OsiLaneBoundaryType {
  UNKNOWN = 0,
  OTHER = 1,
  NO_LINE = 2,
  SOLID_LINE = 3,
  DASHED_LINE = 4,
  BOTTS_DOTS = 5,
  ROAD_EDGE = 6,
  SNOW_EDGE = 7,
  GRASS_EDGE = 8,
  GRAVEL_EDGE = 9,
  SOIL_EDGE = 10,
  GUARD_RAIL = 11,
  CURB = 12,
  STRUCTURE = 13,
}

export interface OsiTimestamp {
  seconds: number;
  nanos: number;
}

export interface OsiIdentifier {
  value: number;
}

export interface OsiDimension3d {
  length: number;
  width: number;
  height: number;
}

export interface OsiVector2d {
  x: number;
  y: number;
}

export interface OsiVector3d {
  x: number;
  y: number;
  z: number;
}

export interface OsiOrientation3d {
  roll: number;
  pitch: number;
  yaw: number;
}

export interface OsiBase {
  dimension: OsiDimension3d;
  position: OsiVector3d;
  orientation: OsiOrientation3d;
  base_polygon: OsiVector2d[];
}

export interface OsiVehicleAttributes {
  bbcenter_to_rear: OsiVector3d;
}

export interface OsiMovingObjectVehicleClassification {
  type: { value: OsiMovingObjectVehicleClassificationType };
  light_state: Record<string, OsiIdentifier>;
}
export interface OsiObject {
  id: OsiIdentifier;
  base: OsiBase;
}

export interface OsiMovingObject extends OsiObject {
  type: { value: OsiMovingObjectType };
  vehicle_attributes: OsiVehicleAttributes;
  vehicle_classification: OsiMovingObjectVehicleClassification;
}

export interface OsiLaneBoundaryBoundaryPoint {
  position: OsiVector3d;
  width: number;
}

export interface OsiLaneBoundaryClassification {
  type: { value: OsiLaneBoundaryType };
}

export interface OsiLaneBoundary {
  id: OsiIdentifier;
  boundary_line: OsiLaneBoundaryBoundaryPoint[];
  classification: OsiLaneBoundaryClassification;
}

export interface OsiGroundTruth {
  timestamp: OsiTimestamp;
  host_vehicle_id: OsiIdentifier;
  stationary_object: OsiObject[];
  moving_object: OsiMovingObject[];
  lane_boundary: OsiLaneBoundary[];
}

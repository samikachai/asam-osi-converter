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

export enum StationaryObjectColor {
  UNKNOWN = 0,
  OTHER = 1,
  YELLOW = 2,
  GREEN = 3,
  BLUE = 4,
  VIOLET = 5,
  RED = 6,
  ORANGE = 7,
  BLACK = 8,
  GREY = 9,
  WHITE = 10,
}

export enum StationaryObjectType {
  UNKNOWN = 0,
  OTHER = 1,
  BRIDGE = 2,
  BUILDING = 3,
  POLE = 4,
  PYLON = 5,
  DELINEATOR = 6,
  TREE = 7,
  BARRIER = 8,
  VEGETATION = 9,
  CURBSTONE = 10,
  WALL = 11,
  VERTICAL_STRUCTURE = 12,
  RECTANGULAR_STRUCTURE = 13,
  OVERHEAD_STRUCTURE = 14,
  REFLECTIVE_STRUCTURE = 15,
  CONSTRUCTION_SITE_ELEMENT = 16,
  SPEED_BUMP = 17,
  EMITTING_STRUCTURE = 18,
}

export enum StationaryObjectMaterial {
  UNKNOWN = 0,
  OTHER = 1,
  WOOD = 2,
  PLASTIC = 3,
  CONCRETE = 4,
  METAL = 5,
  STONE = 6,
  GLAS = 7,
  MUD = 8,
}

export enum StationaryObjectDensity {
  UNKNOWN = 0,
  OTHER = 1,
  SOLID = 2,
  SMALL_MESH = 3,
  MEDIAN_MESH = 4,
  LARGE_MESH = 5,
  OPEN = 6,
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

export interface OsiStationaryObject extends OsiObject {
  classification: {
    color: {
      value: StationaryObjectColor;
    };
    type: {
      value: StationaryObjectType;
    };
    material: {
      value: StationaryObjectMaterial;
    };
    density: {
      value: StationaryObjectDensity;
    };
  };
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

export interface OsiTrafficSign {
  id: OsiIdentifier;
  main_sign: OsiTrafficSignMainSign;
  supplementary_sign: OsiTrafficSignSupplementarySign[];
}

export interface OsiTrafficSignMainSign {
  base: OsiBase;
  classification: OsiTrafficSignMainSignClassification;
}

export interface OsiTrafficSignSupplementarySign {
  base: OsiBase;
  classification: OsiTrafficSignSupplementarySignClassification;
}

export interface OsiTrafficSignMainSignClassification {
  type: {
    value: OsiTrafficSignMainSignClassificationType;
  };
  value: {
    value: number;
  };
}

export interface OsiTrafficSignSupplementarySignClassification {
  type: {
    value: OsiTrafficSignSupplementarySignClassificationType;
  };
  value: {
    value: number;
  };
}

export interface OsiGroundTruth {
  timestamp: OsiTimestamp;
  host_vehicle_id: OsiIdentifier;
  stationary_object: OsiStationaryObject[];
  moving_object: OsiMovingObject[];
  lane_boundary: OsiLaneBoundary[];
  traffic_sign: OsiTrafficSign[];
  traffic_light: OsiTrafficLight[];
}

export enum OsiTrafficSignMainSignClassificationType {
  UNKNOWN = 0,
  OTHER = 1,
  DANGER_SPOT = 2,
  ZEBRA_CROSSING = 87,
  FLIGHT = 110,
  CATTLE = 200,
  HORSE_RIDERS = 197,
  AMPHIBIANS = 188,
  FALLING_ROCKS = 96,
  SNOW_OR_ICE = 94,
  LOOSE_GRAVEL = 97,
  WATERSIDE = 102,
  CLEARANCE = 210,
  MOVABLE_BRIDGE = 101,
  RIGHT_BEFORE_LEFT_NEXT_INTERSECTION = 3,
  TURN_LEFT = 4,
  TURN_RIGHT = 5,
  DOUBLE_TURN_LEFT = 6,
  DOUBLE_TURN_RIGHT = 7,
  HILL_DOWNWARDS = 8,
  HILL_UPWARDS = 9,
  UNEVEN_ROAD = 93,
  ROAD_SLIPPERY_WET_OR_DIRTY = 95,
  SIDE_WINDS = 98,
  ROAD_NARROWING = 10,
  ROAD_NARROWING_RIGHT = 12,
  ROAD_NARROWING_LEFT = 11,
  ROAD_WORKS = 13,
  TRAFFIC_QUEUES = 100,
  TWO_WAY_TRAFFIC = 14,
  ATTENTION_TRAFFIC_LIGHT = 15,
  PEDESTRIANS = 103,
  CHILDREN_CROSSING = 106,
  CYCLE_ROUTE = 107,
  DEER_CROSSING = 109,
  UNGATED_LEVEL_CROSSING = 144,
  LEVEL_CROSSING_MARKER = 112,
  RAILWAY_TRAFFIC_PRIORITY = 135,
  GIVE_WAY = 16,
  STOP = 17,
  PRIORITY_TO_OPPOSITE_DIRECTION = 18,
  PRIORITY_TO_OPPOSITE_DIRECTION_UPSIDE_DOWN = 19,
  PRESCRIBED_LEFT_TURN = 20,
  PRESCRIBED_RIGHT_TURN = 21,
  PRESCRIBED_STRAIGHT = 22,
  PRESCRIBED_RIGHT_WAY = 24,
  PRESCRIBED_LEFT_WAY = 23,
  PRESCRIBED_RIGHT_TURN_AND_STRAIGHT = 26,
  PRESCRIBED_LEFT_TURN_AND_STRAIGHT = 25,
  PRESCRIBED_LEFT_TURN_AND_RIGHT_TURN = 27,
  PRESCRIBED_LEFT_TURN_RIGHT_TURN_AND_STRAIGHT = 28,
  ROUNDABOUT = 29,
  ONEWAY_LEFT = 30,
  ONEWAY_RIGHT = 31,
  PASS_LEFT = 32,
  PASS_RIGHT = 33,
  SIDE_LANE_OPEN_FOR_TRAFFIC = 128,
  SIDE_LANE_CLOSED_FOR_TRAFFIC = 129,
  SIDE_LANE_CLOSING_FOR_TRAFFIC = 130,
  BUS_STOP = 137,
  TAXI_STAND = 138,
  BICYCLES_ONLY = 145,
  HORSE_RIDERS_ONLY = 146,
  PEDESTRIANS_ONLY = 147,
  BICYCLES_PEDESTRIANS_SHARED_ONLY = 148,
  BICYCLES_PEDESTRIANS_SEPARATED_LEFT_ONLY = 149,
  BICYCLES_PEDESTRIANS_SEPARATED_RIGHT_ONLY = 150,
  PEDESTRIAN_ZONE_BEGIN = 151,
  PEDESTRIAN_ZONE_END = 152,
  BICYCLE_ROAD_BEGIN = 153,
  BICYCLE_ROAD_END = 154,
  BUS_LANE = 34,
  BUS_LANE_BEGIN = 35,
  BUS_LANE_END = 36,
  ALL_PROHIBITED = 37,
  MOTORIZED_MULTITRACK_PROHIBITED = 38,
  TRUCKS_PROHIBITED = 39,
  BICYCLES_PROHIBITED = 40,
  MOTORCYCLES_PROHIBITED = 41,
  MOPEDS_PROHIBITED = 155,
  HORSE_RIDERS_PROHIBITED = 156,
  HORSE_CARRIAGES_PROHIBITED = 157,
  CATTLE_PROHIBITED = 158,
  BUSES_PROHIBITED = 159,
  CARS_PROHIBITED = 160,
  CARS_TRAILERS_PROHIBITED = 161,
  TRUCKS_TRAILERS_PROHIBITED = 162,
  TRACTORS_PROHIBITED = 163,
  PEDESTRIANS_PROHIBITED = 42,
  MOTOR_VEHICLES_PROHIBITED = 43,
  HAZARDOUS_GOODS_VEHICLES_PROHIBITED = 164,
  OVER_WEIGHT_VEHICLES_PROHIBITED = 165,
  VEHICLES_AXLE_OVER_WEIGHT_PROHIBITED = 166,
  VEHICLES_EXCESS_WIDTH_PROHIBITED = 167,
  VEHICLES_EXCESS_HEIGHT_PROHIBITED = 168,
  VEHICLES_EXCESS_LENGTH_PROHIBITED = 169,
  DO_NOT_ENTER = 44,
  SNOW_CHAINS_REQUIRED = 170,
  WATER_POLLUTANT_VEHICLES_PROHIBITED = 171,
  ENVIRONMENTAL_ZONE_BEGIN = 45,
  ENVIRONMENTAL_ZONE_END = 46,
  NO_U_TURN_LEFT = 47,
  NO_U_TURN_RIGHT = 48,
  PRESCRIBED_U_TURN_LEFT = 49,
  PRESCRIBED_U_TURN_RIGHT = 50,
  MINIMUM_DISTANCE_FOR_TRUCKS = 51,
  SPEED_LIMIT_BEGIN = 52,
  SPEED_LIMIT_ZONE_BEGIN = 53,
  SPEED_LIMIT_ZONE_END = 54,
  MINIMUM_SPEED_BEGIN = 55,
  OVERTAKING_BAN_BEGIN = 56,
  OVERTAKING_BAN_FOR_TRUCKS_BEGIN = 57,
  SPEED_LIMIT_END = 58,
  MINIMUM_SPEED_END = 59,
  OVERTAKING_BAN_END = 60,
  OVERTAKING_BAN_FOR_TRUCKS_END = 61,
  ALL_RESTRICTIONS_END = 62,
  NO_STOPPING = 63,
  NO_PARKING = 64,
  NO_PARKING_ZONE_BEGIN = 65,
  NO_PARKING_ZONE_END = 66,
  RIGHT_OF_WAY_NEXT_INTERSECTION = 67,
  RIGHT_OF_WAY_BEGIN = 68,
  RIGHT_OF_WAY_END = 69,
  PRIORITY_OVER_OPPOSITE_DIRECTION = 70,
  PRIORITY_OVER_OPPOSITE_DIRECTION_UPSIDE_DOWN = 71,
  TOWN_BEGIN = 72,
  TOWN_END = 73,
  CAR_PARKING = 74,
  CAR_PARKING_ZONE_BEGIN = 75,
  CAR_PARKING_ZONE_END = 76,
  SIDEWALK_HALF_PARKING_LEFT = 172,
  SIDEWALK_HALF_PARKING_RIGHT = 173,
  SIDEWALK_PARKING_LEFT = 174,
  SIDEWALK_PARKING_RIGHT = 175,
  SIDEWALK_PERPENDICULAR_HALF_PARKING_LEFT = 176,
  SIDEWALK_PERPENDICULAR_HALF_PARKING_RIGHT = 177,
  SIDEWALK_PERPENDICULAR_PARKING_LEFT = 178,
  SIDEWALK_PERPENDICULAR_PARKING_RIGHT = 179,
  LIVING_STREET_BEGIN = 77,
  LIVING_STREET_END = 78,
  TUNNEL = 79,
  EMERGENCY_STOPPING_LEFT = 80,
  EMERGENCY_STOPPING_RIGHT = 81,
  HIGHWAY_BEGIN = 82,
  HIGHWAY_END = 83,
  EXPRESSWAY_BEGIN = 84,
  EXPRESSWAY_END = 85,
  NAMED_HIGHWAY_EXIT = 183,
  NAMED_EXPRESSWAY_EXIT = 184,
  NAMED_ROAD_EXIT = 185,
  HIGHWAY_EXIT = 86,
  EXPRESSWAY_EXIT = 186,
  ONEWAY_STREET = 187,
  CROSSING_GUARDS = 189,
  DEADEND = 190,
  DEADEND_EXCLUDING_DESIGNATED_ACTORS = 191,
  FIRST_AID_STATION = 194,
  POLICE_STATION = 195,
  TELEPHONE = 196,
  FILLING_STATION = 198,
  HOTEL = 201,
  INN = 202,
  KIOSK = 203,
  TOILET = 204,
  CHAPEL = 205,
  TOURIST_INFO = 206,
  REPAIR_SERVICE = 207,
  PEDESTRIAN_UNDERPASS = 208,
  PEDESTRIAN_BRIDGE = 209,
  CAMPER_PLACE = 213,
  ADVISORY_SPEED_LIMIT_BEGIN = 214,
  ADVISORY_SPEED_LIMIT_END = 215,
  PLACE_NAME = 216,
  TOURIST_ATTRACTION = 217,
  TOURIST_ROUTE = 218,
  TOURIST_AREA = 219,
  SHOULDER_NOT_PASSABLE_MOTOR_VEHICLES = 220,
  SHOULDER_UNSAFE_TRUCKS_TRACTORS = 221,
  TOLL_BEGIN = 222,
  TOLL_END = 223,
  TOLL_ROAD = 224,
  CUSTOMS = 225,
  INTERNATIONAL_BORDER_INFO = 226,
  STREETLIGHT_RED_BAND = 227,
  FEDERAL_HIGHWAY_ROUTE_NUMBER = 228,
  HIGHWAY_ROUTE_NUMBER = 229,
  HIGHWAY_INTERCHANGE_NUMBER = 230,
  EUROPEAN_ROUTE_NUMBER = 231,
  FEDERAL_HIGHWAY_DIRECTION_LEFT = 232,
  FEDERAL_HIGHWAY_DIRECTION_RIGHT = 233,
  PRIMARY_ROAD_DIRECTION_LEFT = 234,
  PRIMARY_ROAD_DIRECTION_RIGHT = 235,
  SECONDARY_ROAD_DIRECTION_LEFT = 236,
  SECONDARY_ROAD_DIRECTION_RIGHT = 237,
  DIRECTION_DESIGNATED_ACTORS_LEFT = 238,
  DIRECTION_DESIGNATED_ACTORS_RIGHT = 239,
  ROUTING_DESIGNATED_ACTORS = 240,
  DIRECTION_TO_HIGHWAY_LEFT = 143,
  DIRECTION_TO_HIGHWAY_RIGHT = 108,
  DIRECTION_TO_LOCAL_DESTINATION_LEFT = 127,
  DIRECTION_TO_LOCAL_DESTINATION_RIGHT = 136,
  CONSOLIDATED_DIRECTIONS = 118,
  STREET_NAME = 119,
  DIRECTION_PREANNOUNCEMENT = 120,
  DIRECTION_PREANNOUNCEMENT_LANE_CONFIG = 121,
  DIRECTION_PREANNOUNCEMENT_HIGHWAY_ENTRIES = 122,
  HIGHWAY_ANNOUNCEMENT = 123,
  OTHER_ROAD_ANNOUNCEMENT = 124,
  HIGHWAY_ANNOUNCEMENT_TRUCK_STOP = 125,
  HIGHWAY_PREANNOUNCEMENT_DIRECTIONS = 126,
  POLE_EXIT = 88,
  HIGHWAY_DISTANCE_BOARD = 180,
  DETOUR_LEFT = 181,
  DETOUR_RIGHT = 182,
  NUMBERED_DETOUR = 131,
  DETOUR_BEGIN = 132,
  DETOUR_END = 133,
  DETOUR_ROUTING_BOARD = 134,
  OPTIONAL_DETOUR = 111,
  OPTIONAL_DETOUR_ROUTING = 199,
  ROUTE_RECOMMENDATION = 211,
  ROUTE_RECOMMENDATION_END = 212,
  ANNOUNCE_LANE_TRANSITION_LEFT = 192,
  ANNOUNCE_LANE_TRANSITION_RIGHT = 193,
  ANNOUNCE_RIGHT_LANE_END = 90,
  ANNOUNCE_LEFT_LANE_END = 89,
  ANNOUNCE_RIGHT_LANE_BEGIN = 115,
  ANNOUNCE_LEFT_LANE_BEGIN = 116,
  ANNOUNCE_LANE_CONSOLIDATION = 117,
  DETOUR_CITY_BLOCK = 142,
  GATE = 141,
  POLE_WARNING = 91,
  TRAFFIC_CONE = 140,
  MOBILE_LANE_CLOSURE = 139,
  REFLECTOR_POST = 114,
  DIRECTIONAL_BOARD_WARNING = 113,
  GUIDING_PLATE = 104,
  GUIDING_PLATE_WEDGES = 105,
  PARKING_HAZARD = 99,
  TRAFFIC_LIGHT_GREEN_ARROW = 92,
}

export enum OsiTrafficSignSupplementarySignClassificationType {
  UNKNOWN = 0,
  OTHER = 1,
  NO_SIGN = 2,
  TEXT = 41,
  SPACE = 39,
  TIME = 26,
  ARROW = 30,
  CONSTRAINED_TO = 46,
  EXCEPT = 45,
  VALID_FOR_DISTANCE = 3,
  PRIORITY_ROAD_BOTTOM_LEFT_FOUR_WAY = 27,
  PRIORITY_ROAD_TOP_LEFT_FOUR_WAY = 28,
  PRIORITY_ROAD_BOTTOM_LEFT_THREE_WAY_STRAIGHT = 32,
  PRIORITY_ROAD_BOTTOM_LEFT_THREE_WAY_SIDEWAYS = 33,
  PRIORITY_ROAD_TOP_LEFT_THREE_WAY_STRAIGHT = 34,
  PRIORITY_ROAD_BOTTOM_RIGHT_FOUR_WAY = 29,
  PRIORITY_ROAD_TOP_RIGHT_FOUR_WAY = 31,
  PRIORITY_ROAD_BOTTOM_RIGHT_THREE_WAY_STRAIGHT = 35,
  PRIORITY_ROAD_BOTTOM_RIGHT_THREE_WAY_SIDEWAY = 36,
  PRIORITY_ROAD_TOP_RIGHT_THREE_WAY_STRAIGHT = 37,
  VALID_IN_DISTANCE = 4,
  STOP_IN = 25,
  LEFT_ARROW = 11,
  LEFT_BEND_ARROW = 13,
  RIGHT_ARROW = 12,
  RIGHT_BEND_ARROW = 14,
  ACCIDENT = 40,
  SNOW = 9,
  FOG = 8,
  ROLLING_HIGHWAY_INFORMATION = 48,
  SERVICES = 47,
  TIME_RANGE = 5,
  PARKING_DISC_TIME_RESTRICTION = 43,
  WEIGHT = 6,
  WET = 44,
  PARKING_CONSTRAINT = 42,
  NO_WAITING_SIDE_STRIPES = 38,
  RAIN = 7,
  SNOW_RAIN = 10,
  NIGHT = 19,
  STOP_4_WAY = 21,
  TRUCK = 15,
  TRACTORS_MAY_BE_PASSED = 16,
  HAZARDOUS = 17,
  TRAILER = 18,
  ZONE = 20,
  MOTORCYCLE = 22,
  MOTORCYCLE_ALLOWED = 23,
  CAR = 24,
}

export interface OsiTrafficLight extends OsiObject {
  classification: OsiTrafficLightClassification;
}

export interface OsiTrafficLightClassification {
  color: {
    value: OsiTrafficLightClassificationColor;
  };
  icon: {
    value: OsiTrafficLightClassificationIcon;
  };
  mode: {
    value: OsiTrafficLightClassificationMode;
  };
  counter: number;
  assigned_lane_id: OsiIdentifier[];
  is_out_of_service?: boolean;
}

export enum OsiTrafficLightClassificationColor {
  UNKNOWN = 0,
  OTHER = 1,
  RED = 2,
  YELLOW = 3,
  GREEN = 4,
  BLUE = 5,
  WHITE = 6,
}

export enum OsiTrafficLightClassificationIcon {
  UNKNOWN = 0,
  OTHER = 1,
  NONE = 2,
  ARROW_STRAIGHT_AHEAD = 3,
  ARROW_LEFT = 4,
  ARROW_DIAG_LEFT = 5,
  ARROW_STRAIGHT_AHEAD_LEFT = 6,
  ARROW_RIGHT = 7,
  ARROW_DIAG_RIGHT = 8,
  ARROW_STRAIGHT_AHEAD_RIGHT = 9,
  ARROW_LEFT_RIGHT = 10,
  ARROW_DOWN = 11,
  ARROW_DOWN_LEFT = 12,
  ARROW_DOWN_RIGHT = 13,
  ARROW_CROSS = 14,
  PEDESTRIAN = 15,
  WALK = 16,
  DONT_WALK = 17,
  BICYCLE = 18,
  PEDESTRIAN_AND_BICYCLE = 19,
  COUNTDOWN_SECONDS = 20,
  COUNTDOWN_PERCENT = 21,
  TRAM = 22,
  BUS = 23,
  BUS_AND_TRAM = 24,
}

export enum OsiTrafficLightClassificationMode {
  UNKNOWN = 0,
  OTHER = 1,
  OFF = 2,
  CONSTANT = 3,
  FLASHING = 4,
  COUNTING = 5,
}

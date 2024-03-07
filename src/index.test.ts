import { ExtensionContext } from '@foxglove/studio';
import { activate, buildLaneBoundaryMetadata, buildVehicleMetadata } from './index';
import {
  OsiLaneBoundary,
  OsiLaneBoundaryType,
  OsiMovingObjectVehicleClassificationType,
  OsiMovingObjectVehicleClassificationLightStateBrakeLightState,
  OsiMovingObjectVehicleClassificationLightStateGenericLightState,
  OsiMovingObjectVehicleClassificationLightStateIndicatorState,
  OsiGroundTruth,
  OsiMovingObject,
  OsiObject,
  OsiMovingObjectType,
  OsiMovingObjectVehicleClassification,
  OsiBase,
  OsiLaneBoundaryBoundaryPoint,
} from './types/osiGroundTruth';

jest.mock('./trafficsigns', () => ({
  preloadDynamicTextures: () => {}
}), { virtual: true });

describe('ASAM OSI Visualizer: Message Converter', () => {
  const mockRegisterMessageConverter = jest.fn();
  const mockExtensionContext = {} as ExtensionContext;
  const mockBase: OsiBase = {
    dimension: {
      width: 1,
      height: 1,
      length: 1
    },
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    orientation: {
      yaw: 0,
      pitch: 0,
      roll: 0
    },
    base_polygon: []
  };
  const mockMovingObject: OsiMovingObject = {
    id: {
      value: 0
    },
    base: mockBase,
    type: {
      value: OsiMovingObjectType.VEHICLE
    },
    vehicle_attributes: {
      bbcenter_to_rear: {
        x: 0,
        y: 0,
        z: 0
      }
    },
    vehicle_classification: {
      type: {
        value: OsiMovingObjectVehicleClassificationType.SMALL_CAR
      },
      light_state: {}
    }
  };
  const mockStationaryObject: OsiObject = {
    id: {
      value: 1
    },
    base: mockBase
  };
  const mockLaneBoundary: OsiLaneBoundary = {
    id: {
      value: 2
    },
    boundary_line: [{
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      width: 1
    }],
    classification: {
      type: {
        value: OsiLaneBoundaryType.NO_LINE
      }
    }
  };
  const mockMessageData: OsiGroundTruth = {
    timestamp: {
      seconds: 0,
      nanos: 0
    },
    host_vehicle_id: {
      value: 0
    },
    moving_object: [mockMovingObject],
    stationary_object: [mockStationaryObject],
    lane_boundary: [mockLaneBoundary],
    traffic_sign: []
  };
  
  beforeEach(() => {
    mockExtensionContext.registerMessageConverter = mockRegisterMessageConverter;
    mockRegisterMessageConverter.mockClear();
  });
  
  it('registers a message converter', () => {
    activate(mockExtensionContext);
    expect(mockRegisterMessageConverter).toHaveBeenCalledTimes(1);
  });
  
  it('converts a simple message', () => {
    activate(mockExtensionContext);
    const messageConverterArgs = mockRegisterMessageConverter.mock.calls[0][0];
    const result = messageConverterArgs.converter(mockMessageData);
    expect(result.deletions).toBeDefined();
    expect(result.entities).toBeDefined();
  });
});

describe('ASAM OSI Visualizer: Moving Objects', () => {
  it('builds metadata  for vehicle moving objects', () => {
    const input: OsiMovingObjectVehicleClassification = {
      type: {
        value: 5,
      },
      light_state: {
        indicator_state: {
          value: 5,
        },
        brake_light_state: {
          value: 4,
        },
        head_light: {
          value: 3,
        },
      },
    };
    expect(buildVehicleMetadata(input)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: 'type',
          value: OsiMovingObjectVehicleClassificationType[input.type.value],
        }),
        expect.objectContaining({
          key: 'light_state.indicator_state',
          value: OsiMovingObjectVehicleClassificationLightStateIndicatorState[input.light_state.indicator_state.value],
        }),
        expect.objectContaining({
          key: 'light_state.brake_light_state',
          value:
          OsiMovingObjectVehicleClassificationLightStateBrakeLightState[input.light_state.brake_light_state.value],
        }),
        expect.objectContaining({
          key: 'light_state.head_light',
          value: OsiMovingObjectVehicleClassificationLightStateGenericLightState[input.light_state.head_light.value],
        }),
      ])
      );
    });
  });
  
  describe('ASAM OSI Visualizer: Lane Boundaries', () => {
    it('builds metadata for lane boundaries', () => {
      const mockLaneBoundaryPoint: OsiLaneBoundaryBoundaryPoint = {
        position: { x: 0, y: 0, z: 0 },
        width: 2.0,
      };
      const mockLaneBoundary: OsiLaneBoundary = {
        id: { value: 123 },
        classification: {
          type: { value: OsiLaneBoundaryType.SOLID_LINE },
        },
        boundary_line: [mockLaneBoundaryPoint],
      };
      
      expect(buildLaneBoundaryMetadata(mockLaneBoundary)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            key: 'type',
            value: OsiLaneBoundaryType[mockLaneBoundary.classification.type.value],
          }),
          expect.objectContaining({
            key: 'width',
            value: mockLaneBoundaryPoint.width.toString(),
          }),
        ])
        );
      });
    });
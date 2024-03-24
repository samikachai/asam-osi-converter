import { buildTrafficSignModel, preloadDynamicTextures } from "../trafficsigns";
import { OsiTrafficSignMainSign } from "../types/osiGroundTruth";

const mockImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const mockImagesMain = {
  0: mockImage,
  1: mockImage,
};
const mockImagesSupp = {};
jest.mock("../trafficsigns/images", () => ({
  get main() {
    return mockImagesMain;
  },
  get supplementary() {
    return mockImagesSupp;
  },
}));

const mockMainTextureHandlerMap = new Map([
  [
    1,
    {
      getText: () => "",
      getOptions: () => ({}),
    },
  ],
]);
const mockSuppTextureHandlerMap = new Map();
const mockFnDrawTrafficSignText = jest.fn().mockReturnValue(mockImage);
jest.mock("../trafficsigns/textures", () => ({
  drawTrafficSignText: () => mockFnDrawTrafficSignText(),
  get main() {
    return mockMainTextureHandlerMap;
  },
  get supplementary() {
    return mockSuppTextureHandlerMap;
  },
}));

describe("OsiGroundTruthVisualizer: 3D Models", () => {
  beforeEach(() => {
    mockFnDrawTrafficSignText.mockClear();
  });

  it("preloads the textures included in the handlers map", () => {
    const result = preloadDynamicTextures();
    expect(result).toHaveLength(mockMainTextureHandlerMap.size + mockSuppTextureHandlerMap.size);
  });

  it("builds a static traffic sign model", () => {
    const mockMainSignStatic = {
      base: {
        dimension: {
          width: 1,
          height: 1,
          length: 1,
        },
        position: {
          x: 1,
          y: 1,
          z: 1,
        },
        orientation: {
          pitch: 0,
          yaw: 0,
          roll: 1,
        },
      },
      classification: {
        type: {
          value: 0,
        },
        value: {
          value: 1,
        },
      },
    } as OsiTrafficSignMainSign;

    expect(buildTrafficSignModel("main", mockMainSignStatic)).toEqual(
      expect.objectContaining({
        data: expect.any(Uint8Array),
      }),
    );
    expect(mockFnDrawTrafficSignText).not.toHaveBeenCalled();
  });

  it("builds a dynamic traffic sign model", () => {
    const mockMainSignDynamic = {
      base: {
        dimension: {
          width: 1,
          height: 1,
          length: 1,
        },
        position: {
          x: 1,
          y: 1,
          z: 1,
        },
        orientation: {
          pitch: 0,
          yaw: 0,
          roll: 1,
        },
      },
      classification: {
        type: {
          value: 1,
        },
        value: {
          value: 1,
        },
      },
    } as OsiTrafficSignMainSign;

    expect(buildTrafficSignModel("main", mockMainSignDynamic)).toEqual(
      expect.objectContaining({
        data: expect.any(Uint8Array),
      }),
    );
    expect(mockFnDrawTrafficSignText).toHaveBeenCalledTimes(1);
  });
});

const ImageIfdTags = [
    "ProcessingSoftware",
    "NewSubfileType",
    "SubfileType",
    "ImageWidth",
    "ImageLength",
    "BitsPerSample",
    "Compression",
    "PhotometricInterpretation",
    "Threshholding",
    "CellWidth",
    "CellLength",
    "FillOrder",
    "DocumentName",
    "ImageDescription",
    "Make",
    "Model",
    "StripOffsets",
    "Orientation",
    "SamplesPerPixel",
    "RowsPerStrip",
    "StripByteCounts",
    "XResolution",
    "YResolution",
    "PlanarConfiguration",
    "GrayResponseUnit",
    "GrayResponseCurve",
    "T4Options",
    "T6Options",
    "ResolutionUnit",
    "TransferFunction",
    "Software",
    "DateTime",
    "Artist",
    "HostComputer",
    "Predictor",
    "WhitePoint",
    "PrimaryChromaticities",
    "ColorMap",
    "HalftoneHints",
    "TileWidth",
    "TileLength",
    "TileOffsets",
    "TileByteCounts",
    "SubIFDs",
    "InkSet",
    "InkNames",
    "NumberOfInks",
    "DotRange",
    "TargetPrinter",
    "ExtraSamples",
    "SampleFormat",
    "SMinSampleValue",
    "SMaxSampleValue",
    "TransferRange",
    "ClipPath",
    "XClipPathUnits",
    "YClipPathUnits",
    "Indexed",
    "JPEGTables",
    "OPIProxy",
    "JPEGProc",
    "JPEGInterchangeFormat",
    "JPEGInterchangeFormatLength",
    "JPEGRestartInterval",
    "JPEGLosslessPredictors",
    "JPEGPointTransforms",
    "JPEGQTables",
    "JPEGDCTables",
    "JPEGACTables",
    "YCbCrCoefficients",
    "YCbCrSubSampling",
    "YCbCrPositioning",
    "ReferenceBlackWhite",
    "XMLPacket",
    "Rating",
    "RatingPercent",
    "ImageID",
    "CFARepeatPatternDim",
    "CFAPattern",
    "BatteryLevel",
    "Copyright",
    "ExposureTime",
    "ImageResources",
    "ExifTag",
    "InterColorProfile",
    "GPSTag",
    "Interlace",
    "TimeZoneOffset",
    "SelfTimerMode",
    "FlashEnergy",
    "SpatialFrequencyResponse",
    "Noise",
    "FocalPlaneXResolution",
    "FocalPlaneYResolution",
    "FocalPlaneResolutionUnit",
    "ImageNumber",
    "SecurityClassification",
    "ImageHistory",
    "ExposureIndex",
    "TIFFEPStandardID",
    "SensingMethod",
    "XPTitle",
    "XPComment",
     
   ];

const exifIfdTags = [
    "ExposureTime",
    "FNumber",
    "ExposureProgram",
    "SpectralSensitivity",
    "ISOSpeedRatings",
    "OECF",
    "SensitivityType",
    "StandardOutputSensitivity",
    "RecommendedExposureIndex",
    "ISOSpeed",
    "ISOSpeedLatitudeyyy",
    "ISOSpeedLatitudezzz",
    "ExifVersion",
    "DateTimeOriginal",
    "DateTimeDigitized",
    "ComponentsConfiguration",
    "CompressedBitsPerPixel",
    "ShutterSpeedValue",
    "ApertureValue",
    "BrightnessValue",
    "ExposureBiasValue",
    "MaxApertureValue",
    "SubjectDistance",
    "MeteringMode",
    "LightSource",
    "Flash",
    "FocalLength",
    "SubjectArea",
    "MakerNote",
    "UserComment",
    "SubSecTime",
    "SubSecTimeOriginal",
    "SubSecTimeDigitized",
    "FlashpixVersion",
    "ColorSpace",
    "PixelXDimension",
    "PixelYDimension",
    "RelatedSoundFile",
    "InteroperabilityTag",
    "FlashEnergy",
    "SpatialFrequencyResponse",
    "FocalPlaneXResolution",
    "FocalPlaneYResolution",
    "FocalPlaneResolutionUnit",
    "SubjectLocation",
    "ExposureIndex",
    "SensingMethod",
    "FileSource",
    "SceneType",
    "CFAPattern",
    "CustomRendered",
    "ExposureMode",
    "WhiteBalance",
    "DigitalZoomRatio",
    "FocalLengthIn35mmFilm",
    "SceneCaptureType",
    "GainControl",
    "Contrast",
    "Saturation",
    "Sharpness",
    "DeviceSettingDescription",
    "SubjectDistanceRange",
    "ImageUniqueID",
    "CameraOwnerName",
    "BodySerialNumber",
    "LensSpecification",
    "LensMake",
    "LensModel",
    "LensSerialNumber",
    "Gamma"
   ];


const gpsTags = [
    "GPSVersionID",
    "GPSLatitudeRef",
    "GPSLatitude",
    "GPSLongitudeRef",
    "GPSLongitude",
    "GPSAltitudeRef",
    "GPSAltitude",
    "GPSTimeStamp",
    "GPSSatellites",
    "GPSStatus",
    "GPSMeasureMode",
    "GPSDOP",
    "GPSSpeedRef",
    "GPSSpeed",
    "GPSTrackRef",
    "GPSTrack",
    "GPSImgDirectionRef",
    "GPSImgDirection",
    "GPSMapDatum",
    "GPSDestLatitudeRef",
    "GPSDestLatitude",
    "GPSDestLongitudeRef",
    "GPSDestLongitude",
    "GPSDestBearingRef",
    "GPSDestBearing",
    "GPSDestDistanceRef",
    "GPSDestDistance",
    "GPSProcessingMethod",
    "GPSAreaInformation",
    "GPSDateStamp",
    "GPSDifferential",
    "GPSHPositioningError"
];

module.exports = {
    ImageIfdTags,
    exifIfdTags,
    gpsTags
};
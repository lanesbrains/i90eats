const useI90Locations = () => {
  const allLocations = [
    // Washington
    "Seattle, WA",
    "Bellevue, WA",
    "Issaquah, WA",
    "Snoqualmie Pass, WA",
    "Cle Elum, WA",
    "Ellensburg, WA",
    "Spokane, WA",
    // Idaho
    "Coeur d'Alene, ID",
    "Kellogg, ID",
    "Wallace, ID",
    "Lookout Pass, ID",
    // Montana
    "Missoula, MT",
    "Butte, MT",
    "Bozeman, MT",
    "Livingston, MT",
    "Big Timber, MT",
    "Billings, MT",
    // Wyoming (brief section)
    "Sheridan, WY",
    // South Dakota
    "Rapid City, SD",
    "Wall, SD",
    "Kadoka, SD",
    "Murdo, SD",
    "Chamberlain, SD",
    "Mitchell, SD",
    "Sioux Falls, SD",
    // Minnesota
    "Luverne, MN",
    "Worthington, MN",
    "Fairmont, MN",
    "Blue Earth, MN",
    "Albert Lea, MN",
    "Austin, MN",
    "Rochester, MN",
    "La Crosse, WI",
    // Wisconsin section
    // Iowa
    "Des Moines, IA",
    "Newton, IA",
    "Grinnell, IA",
    "Iowa City, IA",
    "Davenport, IA",
    // Illinois
    "Rock Island, IL",
    "Moline, IL",
    "Chicago, IL",
    "Hammond, IN",
    // Indiana section
    // Ohio
    "Toledo, OH",
    "Fremont, OH",
    "Elyria, OH",
    "Cleveland, OH",
    // Pennsylvania
    "Erie, PA",
    // New York
    "Buffalo, NY",
    "Batavia, NY",
    "Rochester, NY",
    "Syracuse, NY",
    "Utica, NY",
    "Albany, NY",
    // Massachusetts
    "Springfield, MA",
    "Worcester, MA",
    "Boston, MA"
  ];
  const majorCities = [
    "Seattle, WA",
    "Spokane, WA",
    "Missoula, MT",
    "Billings, MT",
    "Rapid City, SD",
    "Sioux Falls, SD",
    "Des Moines, IA",
    "Chicago, IL",
    "Toledo, OH",
    "Cleveland, OH",
    "Buffalo, NY",
    "Albany, NY",
    "Boston, MA"
  ];
  const getLocationsByState = (state) => {
    return allLocations.filter((location) => location.endsWith(`, ${state}`));
  };
  const getMajorCities = () => {
    return majorCities;
  };
  const isMajorCity = (location) => {
    return majorCities.includes(location);
  };
  return {
    allLocations,
    majorCities,
    getLocationsByState,
    getMajorCities,
    isMajorCity
  };
};

export { useI90Locations as u };
//# sourceMappingURL=useI90Locations-CGLnxot8.mjs.map

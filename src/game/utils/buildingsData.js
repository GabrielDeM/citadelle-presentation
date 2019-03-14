export const getBuildingData = (props, buildingName) => {
  const { buildings, buildingsData } = props;
  const building = buildings.filter(building => building.name.toLowerCase() === buildingName.toLowerCase())[0];
  const buildingUp = buildingsData[0].upgrade[buildingName];
  const buildingLvl = buildingUp[building.level];
  return buildingLvl;
}

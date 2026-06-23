import {
  CreateAutomobileUseCase,
  DeleteAutomobileUseCase,
  GetAutomobileByIdUseCase,
  ListAutomobilesUseCase,
  UpdateAutomobileUseCase,
} from "../../modules/automobiles/application";
import { InMemoryAutomobileRepository } from "../../modules/automobiles/infra/in-memory/in-memory-automobile-repository";
import {
  CreateDriverUseCase,
  DeleteDriverUseCase,
  GetDriverByIdUseCase,
  ListDriversUseCase,
  UpdateDriverUseCase,
} from "../../modules/drivers/application";
import { InMemoryDriverRepository } from "../../modules/drivers/infra/in-memory/in-memory-driver-repository";
import {
  CreateVehicleUsageUseCase,
  FinishVehicleUsageUseCase,
  GetVehicleUsageByIdUseCase,
  ListVehicleUsagesUseCase,
} from "../../modules/vehicle-usages/application";
import { InMemoryVehicleUsageRepository } from "../../modules/vehicle-usages/infra/in-memory/in-memory-vehicle-usage-repository";

export function createInMemoryServices() {
  const automobileRepository = new InMemoryAutomobileRepository();
  const driverRepository = new InMemoryDriverRepository();
  const vehicleUsageRepository = new InMemoryVehicleUsageRepository();

  return {
    repositories: {
      automobileRepository,
      driverRepository,
      vehicleUsageRepository,
    },
    automobiles: {
      create: new CreateAutomobileUseCase(automobileRepository),
      update: new UpdateAutomobileUseCase(automobileRepository),
      delete: new DeleteAutomobileUseCase(automobileRepository, vehicleUsageRepository),
      getById: new GetAutomobileByIdUseCase(automobileRepository),
      list: new ListAutomobilesUseCase(automobileRepository),
    },
    drivers: {
      create: new CreateDriverUseCase(driverRepository),
      update: new UpdateDriverUseCase(driverRepository),
      delete: new DeleteDriverUseCase(driverRepository, vehicleUsageRepository),
      getById: new GetDriverByIdUseCase(driverRepository),
      list: new ListDriversUseCase(driverRepository),
    },
    vehicleUsages: {
      create: new CreateVehicleUsageUseCase(
        vehicleUsageRepository,
        automobileRepository,
        driverRepository,
      ),
      finish: new FinishVehicleUsageUseCase(vehicleUsageRepository),
      getById: new GetVehicleUsageByIdUseCase(vehicleUsageRepository),
      list: new ListVehicleUsagesUseCase(
        vehicleUsageRepository,
        automobileRepository,
        driverRepository,
      ),
    },
  };
}

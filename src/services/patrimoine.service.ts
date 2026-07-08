import api from './api';

export interface Building {
  id: string;
  name: string;
  code: string;
  address: string;
  floors_count?: number;
  total_units?: number;
  occupancy_rate?: number;
}

export interface Floor {
  id: string;
  building: string;
  number: number;
  chemical_code: string;
  name: string;
}

export interface ManagedUnit {
  id: string;
  identifier: string;
  name: string;
  floor: string;
  unit_type: string;
  area_m2: string;
  monthly_rent: string;
  monthly_charges: string;
  current_status: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  reference: string;
  category: string;
  brand: string;
  stock_quantity: number;
}

export interface InventoryAssignment {
  id: string;
  inventory_item: string;
  unit: string;
  serial_number: string;
  condition_on_assignment: string;
  current_condition: string;
  assigned_by: string;
  assignment_date: string;
  return_date: string | null;
}

export const patrimoineService = {
  // Buildings
  async getBuildings(): Promise<Building[]> {
    const { data } = await api.get('/patrimoine/buildings/');
    return data.results ?? data;
  },

  async getBuilding(id: string): Promise<Building> {
    const { data } = await api.get(`/patrimoine/buildings/${id}/`);
    return data;
  },

  // Floors
  async getFloors(buildingId?: string): Promise<Floor[]> {
    const params = buildingId ? { building: buildingId } : {};
    const { data } = await api.get('/patrimoine/floors/', { params });
    return data.results ?? data;
  },

  // Units
  async getUnits(params?: Record<string, string>): Promise<ManagedUnit[]> {
    const { data } = await api.get('/patrimoine/units/', { params });
    return data.results ?? data;
  },

  async getUnit(id: string): Promise<ManagedUnit> {
    const { data } = await api.get(`/patrimoine/units/${id}/`);
    return data;
  },

  // Inventory
  async getInventory(): Promise<InventoryItem[]> {
    const { data } = await api.get('/patrimoine/inventory/');
    return data.results ?? data;
  },

  async getAssignments(unitId?: string): Promise<InventoryAssignment[]> {
    const url = unitId
      ? `/patrimoine/inventory-assignments/by_unit/?unit_id=${unitId}`
      : '/patrimoine/inventory-assignments/';
    const { data } = await api.get(url);
    return Array.isArray(data) ? data : (data.results ?? []);
  },
};

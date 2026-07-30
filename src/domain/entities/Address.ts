/** Dirección de envío. Colombia-first: departamento + ciudad. */
export interface Address {
  readonly fullName: string;
  readonly phone: string;
  readonly department: string; // Departamento (Antioquia, Cundinamarca, ...)
  readonly city: string;
  readonly line1: string;
  readonly line2?: string;
  readonly notes?: string;
}

function mapToDTO<T, U>(entity: T, DTOClass: new (data: Partial<U>) => U): U {
  // if entity has nested objects as DTOClass fields, handle manually in constructor
  return new DTOClass(entity as Partial<U>);
}

function mapArrayToDTO<T, U>(entities: T[], DTOClass: new (data: Partial<U>) => U): U[] {
  return entities.map((e) => mapToDTO(e, DTOClass));
}

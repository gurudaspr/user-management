
export const DBConfig = {
    name: "EmployeeDatabase",
    version: 1,
    objectStoresMeta: [
      {
        store: "employees",
        storeConfig: { keyPath: "id", autoIncrement: true },
        storeSchema: [
          { name: "name", keypath: "name", options: { unique: false } },
          { name: "email", keypath: "email", options: { unique: true } },
          { name: "password", keypath: "password", options: { unique: false } },
          { name: "isBlocked", keypath: "isBlocked", options: { unique: false } },
          { name: "logins", keypath: "logins", options: { unique: false } },
          { name: "department", keypath: "department", options: { unique: false } },
          { name: "designation", keypath: "designation", options: { unique: false } },
          { name: "city", keypath: "city", options: { unique: false } },
          { name: "createdAt", keypath: "createdAt", options: { unique: false } }, 
          { name: "updatedAt", keypath: "updatedAt", options: { unique: false } },
        ],
      },
    ],
  };
  
// https://medium.com/@sunnysun_5694/how-to-map-rest-api-data-using-decorator-pattern-in-angular-6-94eb49ba16b1

export class ModelMapper<T> {
    _propertyMapping: any;
    _target: any;
       constructor(type: { new(): T ; }) {
          this._target = new type();
          this._propertyMapping = this._target.constructor._propertyMap;
       }

       map(source) {
         Object.keys(this._target).forEach((key) => {
           const mappedKey = this._propertyMapping[key];
           if (mappedKey) {
             this._target[key] = source[mappedKey];
           } else {
             this._target[key] = source[key];
           }
         });
         Object.keys(source).forEach((key) => {
           const targetKeys = Object.keys(this._target);
           if (targetKeys.indexOf(key) === -1) {
             this._target[key] = source[key];
           }
         });
        return this._target;
       }
  }

// e.g. The updated service looks like the below.
// return this.http.get<TodoModel[]>(this.url).pipe(
//     map(data => data.map((item: any) => {
//        return new ModelMapper(TodoModel).map(item);
//  })));

//// api-service.ts
// return this.http.get<T[]>(url).pipe(
//     map(data => data.map((item: any) => {
//        return new ModelMapper(T).map(item);
//  })));

 //// todo-service.ts
//  getAllTodos(): Observable<TodoModel[]> {
//         return this.apiservice.get<TodoModel[]>(this.url);
//  }


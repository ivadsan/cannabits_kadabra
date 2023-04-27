[//]: # @param group $$ TypeScript
[//]: # @param title $$ 03 - Curso de TypeScript: Programación Orientada a Objetos y Asincronismo
[//]: # @param author $$ Iván D. Sánchez


# Curso de TypeScript: Programación Orientada a Objetos y Asincronismo

## Fundamentos de POO

### Preparar el proyecto

- inicializar NPM, Git, gititnore
- Instalacion como dependencia de desarrollo de TS y ts-node
- Inicializar tsconfig
- Configurar tsconfig (outdir)
- editorconfig

### class

Los atributos de la clase se deben inicializar con un valor por defecto o a través del constructor

```
class MyDate{
  year: number = 0
  month: number = 0 
  day: number = 0
}
````

ó

```
class MyDate {
  year: number = 0;
  month: number;
  day: number;

  constructor(year: number, month: number, day: number) {
    this.year = year;
    this.month = month;
    this.day = day;
  }
}

```

Si en el archivo tsconfig.json cambiamos la version de transpilación de JS a es5 el resultado de la clase va a ser una función constructora mientras que con es2016 que soporta clases nativamente, lo transpila a clases.


Las instancias son del tipo de la clase con la que se crean


### Métodos

* Los métodos definen el comportamiendo de los objetos

* Los métodos en TS se comportan igual que las funciones

* Podemos firmar el tipo que retorna un método, también usar literal types.

```
export class MyDate {
  year: number = 0;
  month: number;
  day: number;

  constructor(year: number, month: number, day: number) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  printFormat(): string {
    return `${this.year}/${this.month}/${this.day}`;
  }

  add(amount: number, type: 'days' | 'months' | 'years'){
    if(type === 'days'){
      this.day += amount
    }
    if(type === 'months'){
      this.month += amount
    }
    if(type === 'years'){
      this.year += amount
    }
  }
}

const myDate = new MyDate(1997, 7, 21);
console.log(myDate.printFormat())

myDate.add(2, 'days')
console.log(myDate.printFormat())

```


### Acceso público

* El acceso público quiere decir que podemos acceder a las propiedades y métodos del objeto desde el exterior.

* Por defecto los atributos y métodos son de tipo public, aunque se puede  hacer de manera explicita agregando la palabra public, podemos trabajar de manera implicita el modo público sin agregar nada mas al código.

* En algunas ocasiones es necesario controlar el acceso a los atributos y no permitir ser modificados fuera de la clase, para ello podriamos agregar readonly a los atributos, sin embargo aunque no puedan ser modificados desde afuera de la clase, tampoco podrían ser modificados dentro de la clase.

```
export class MyDate {
  readonly year: number = 0;
  public month: number;
  public day: number;

  constructor(year: number, month: number, day: number) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  printFormat(): string {
    return `${this.year}/${this.month}/${this.day}`;
  }

  public add(amount: number, type: 'days' | 'months' | 'years'){
    if(type === 'days'){
      this.day += amount
    }
    if(type === 'months'){
      this.month += amount
    }
    if(type === 'years'){
      this.year += amount
    }
  }
}

const newDate = new MyDate(1990,7,29)
newDate.year = 123 // TS error. readonly attribute

```


### Acceso privado

* Con la palabra reservada private podemos controlar el acceso a los atributos y métodos desde fuera de la clase.

* Los atributos privados los podemos exponer por medio de un método público que los retorne


```
export class MyDate {
  public year: number = 0;
  public month: number;
  private day: number;

  constructor(year: number, month: number, day: number) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  printFormat(): string {
    const day = this.addPadding(this.day)
    const month = this.addPadding(this.month)
    return `${this.year}/${month}/${day}`;
  }

  private addPadding(value: number) {
    if (value < 10) {
      return `0${value}`;
    }
    return `${value}`;
  }

  public add(amount: number, type: 'days' | 'months' | 'years') {
    if (type === 'days') {
      this.day += amount;
    }
    if (type === 'months') {
      this.month += amount;
    }
    if (type === 'years') {
      this.year += amount;
    }
  }

  getDay(){
    return this.day
  }


}

const newDate = new MyDate(1996, 3, 9);
console.log(newDate.printFormat())
console.log(newDate.getDay())

```

### constructor

Existe una forma resumida para definir y asignar los atributos de la clase desde el constructor de la siguiente forma

```
export class MyDate {
  constructor(public year: number, public month: number, private day: number) {}

  printFormat(): string {
    const day = this.addPadding(this.day);
    const month = this.addPadding(this.month);
    return `${this.year}/${month}/${day}`;
  }

  private addPadding(value: number) {
    if (value < 10) {
      return `0${value}`;
    }
    return `${value}`;
  }

  public add(amount: number, type: 'days' | 'months' | 'years') {
    if (type === 'days') {
      this.day += amount;
    }
    if (type === 'months') {
      this.month += amount;
    }
    if (type === 'years') {
      this.year += amount;
    }
  }

  getDay() {
    return this.day;
  }
}

```
Nota: de esta forma se hace obligatorio indicarle al método constructor, el tipo de acceso de cada atributo


También es posible pasar desde acá valores por defecto

```
export class MyDate {

  constructor(
    public year: number = 1984,
    public month: number = 6,
    private day: number = 26) {}

  printFormat(): string {
    const day = this.addPadding(this.day);
    const month = this.addPadding(this.month);
    return `${this.year}/${month}/${day}`;
  }

  private addPadding(value: number) {
    if (value < 10) {
      return `0${value}`;
    }
    return `${value}`;
  }

  public add(amount: number, type: 'days' | 'months' | 'years') {
    if (type === 'days') {
      this.day += amount;
    }
    if (type === 'months') {
      this.month += amount;
    }
    if (type === 'years') {
      this.year += amount;
    }
  }

  getDay() {
    return this.day;
  }
}

const newDate = new MyDate(1996, 3, 9);
console.log(newDate.printFormat());
console.log(newDate.getDay());

const newDate2 = new MyDate();
console.log(newDate2.printFormat());

const newDate3 = new MyDate(2015);
console.log(newDate3.printFormat());

const newDate4 = new MyDate(2017, 8);
console.log(newDate4.printFormat());

```

### getters

Es una forma controlada de acceder a los atributos de la clase, en especial las de acceso privado

Para usar los getters creamos nuestros método de acceso de la forma:

```
get attribute-name(){

}

```

Las variables privadas que usen getters and setters deben iniciar por _ 

Para acceder al getter desde el objeto instanciado lo hacemos como si fuera un atributo de la clase, esto lo podemos hacer tambien con los métodos, solo debemos agregar la palabra reservada get antes del método para que también tenga este comportamiento

Los getters siempre deben retornar un valor


```
export class MyDate {

  constructor(
    public year: number = 1984,
    public month: number = 6,
    private _day: number = 26) {}

  printFormat(): string {
    const day = this.addPadding(this.day);
    const month = this.addPadding(this.month);
    return `${this.year}/${month}/${day}`;
  }

  private addPadding(value: number) {
    if (value < 10) {
      return `0${value}`;
    }
    return `${value}`;
  }

  public add(amount: number, type: 'days' | 'months' | 'years') {
    if (type === 'days') {
      this._day += amount;
    }
    if (type === 'months') {
      this.month += amount;
    }
    if (type === 'years') {
      this.year += amount;
    }
  }

  get day() {
    return this._day;
  }

  get isLeapYear(){
    if(this.year % 400 === 0) return true
    if(this.year % 100 === 0) return false
    return this.year % 4 === 0
  }
}

const newDate = new MyDate(2004, 3, 9);
console.log(newDate.day)
console.log(newDate.isLeapYear)

```


### setters


* Los setters son funciones de tipo void, no retornan nada. 
* Es requerido uno o más parámetros
* Es util el uso de un setter cuando tenemos reglas de modificación sobre los valores de los atributos de la clase

```

export class MyDate {

  constructor(
    public year: number = 1984,
    public _month: number = 6,
    private _day: number = 26) {}

  printFormat(): string {
    const day = this.addPadding(this._day);
    const month = this.addPadding(this._month);
    return `${this.year}/${month}/${day}`;
  }

  private addPadding(value: number) {
    if (value < 10) {
      return `0${value}`;
    }
    return `${value}`;
  }

  public add(amount: number, type: 'days' | 'months' | 'years') {
    if (type === 'days') {
      this._day += amount;
    }
    if (type === 'months') {
      this._month += amount;
    }
    if (type === 'years') {
      this.year += amount;
    }
  }

  get day() {
    return this._day;
  }

  get isLeapYear(){
    if(this.year % 400 === 0) return true
    if(this.year % 100 === 0) return false
    return this.year % 4 === 0
  }

  get month(){
    return this._month
  }

  set month(value: number){
    try{
      if(value >= 1 && value <= 12){
        this._month = value
      }
      else{
        throw new Error('month out of range')
      }
    }
    catch(e){
      const error = (e as Error).message;
      console.log(error)
    }
  }
}

const newDate = new MyDate(2004, 3, 9);
console.log(newDate.month)


const newDate2 = new MyDate(2004, 3, 9);
newDate2.month = 11
console.log('(11)=>',newDate2.month)


const newDate3 = new MyDate(2004, 3, 9);
newDate3.month = 25
console.log('(error',newDate3.month)

console.log('With error handling')

```

## POO Avanzado

### Herencia (inheritance)

* La clase hereda a través de la palabra reservada ***extends***

* Podemos agregar métodos nuevos en la clase hija de la forma tradicional pero si agregamos un atributo nuevo tenemos que recibir los atributos padre por medio del constructor de la clase hija y los pasamos por super(constructor del padre desde la clase hija).

* Los atributos nuevos en la clase hija, no requieren ser pasados por el constructor de la clase padre por medio de super.

```
export class Animal {
  constructor(public name: string) {}

  move() {
    console.log('Moving along!!');
  }

  greeting() {
    return `Hello my name is ${this.name}`;
  }
}

export class Dog extends Animal {
  constructor(name: string, public owner: string) {
    super(name);
  }

  woof(times: number): void {
    for (let index = 0; index < times; index++) {
      console.log('Woof!!');
    }
  }
}

const anyAnimal = new Animal('foo');
anyAnimal.move();
console.log(anyAnimal.greeting());

const pancho = new Dog('Pancho', 'Ivan');
pancho.move();
console.log(pancho.greeting());
pancho.woof(3);

```

### Acceso protegido (protected)

Cuando deseamos proteger el acceso externo de un atributo de la clase padre desde una instancia de la clase hija usamos protected, ya que si usamos private no heredamos los atributos o métodos con este tipo de acceso.

```
export class Animal {
  constructor(public name: string) {}

  move() {
    console.log('Moving along!!');
  }

  greeting() {
    return `Hello my name is ${this.name}`;
  }

  protected doSomething(){
    console.log('something')
  }
}

export class Dog extends Animal {
  constructor(name: string, public owner: string) {
    super(name);
  }

  woof(times: number): void {
    for (let index = 0; index < times; index++) {
      console.log('Woof!!');
    }
    this.doSomething()
  }
}

const anyAnimal = new Animal('foo');
anyAnimal.move();
console.log(anyAnimal.greeting());

const pancho = new Dog('Pancho', 'Ivan');
pancho.move();
console.log(pancho.greeting());
pancho.woof(1);
//pancho.doSomething()

```

### Polimorfismo

Podemos reescribir los métodos de la clase padre desde la clase hija (polimorfismos) y seguir accediendo a los métodos de la clase padre de la forma super.methodName()

```
export class Animal {
  constructor(public name: string) {}

  move() {
    console.log('Moving along!!');
  }

  greeting() {
    return `Hello my name is ${this.name}`;
  }

  protected doSomething(){
    console.log('something')
  }
}

export class Dog extends Animal {
  constructor(name: string, public owner: string) {
    super(name);
  }

  woof(times: number): void {
    for (let index = 0; index < times; index++) {
      console.log('Woof!!');
    }
    this.doSomething()
  }

  move(): void {
    console.log('moving as Dog!!!')
    super.move()
  }
}

const anyAnimal = new Animal('foo');
anyAnimal.move();
console.log(anyAnimal.greeting());

const pancho = new Dog('Pancho', 'Ivan');
pancho.move();
console.log(pancho.greeting());
pancho.woof(1);
//pancho.doSomething()

```


### Static

Los atributos o métodos estáticos son aquellos que no requieren de una instancia para ser accedidos.

En caso de querer proteger un atributo static de su modificación es agregarle readonly

```
class MyMath{
  static readonly PI= 3.14

  static max(...numbers: number[]){
    return numbers.reduce((max, item) => max >= item ? max :  item)
  }
}


//MyMath.PI = 2.2
console.log(MyMath.PI)

const numbers = [-1,-4.-5]
console.log(MyMath.max(...numbers))


```

### Interfaces

* Las interfaces en clases funcionan como contratos, nos permiten tipar tanto los atributos como los métodos.

* Aquí no podemos utilizar encapsulamiento, por defecto todos los atributos y métodos son públicos.

* Para utilizar una interface en una clase usamos la palabra reservada **implements**

```
interface Driver {
  database: string;
  password: string;
  port: number;

  connect(): void;
  disconnect(): void;
  isConnected(name: string): boolean;
}

class OracleDriver implements Driver {
  constructor(
    public database: string,
    public password: string,
    public port: number
  ) {}
  connect(): void {
    throw new Error("Method not implemented.");
  }
  disconnect(): void {
    throw new Error("Method not implemented.");
  }
  isConnected(name: string): boolean {
    throw new Error("Method not implemented.");
  }
}

class MySQLDriver implements Driver {
  constructor(
    public database: string,
    public password: string,
    public port: number
  ) {}
  connect(): void {
    throw new Error("Method not implemented.");
  }
  disconnect(): void {
    throw new Error("Method not implemented.");
  }
  isConnected(name: string): boolean {
    throw new Error("Method not implemented.");
  }
}

```

### abstract

Las clases abstractas no permiten ser instanciadas, esto se usa en las clase base. La única forma de generar una instancia es a través de alguna de las clase hija de una clase abstracta

```
export abstract class Animal {
  constructor(public name: string) {}

  move() {
    console.log('Moving along!!');
  }

  greeting() {
    return `Hello my name is ${this.name}`;
  }

  protected doSomething(){
    console.log('something')
  }
}

export class Dog extends Animal {
  constructor(name: string, public owner: string) {
    super(name);
  }

  woof(times: number): void {
    for (let index = 0; index < times; index++) {
      console.log('Woof!!');
    }
    this.doSomething()
  }

  move(): void {
    console.log('moving as Dog!!!')
    super.move()
  }
}
```

```
import {Animal, Dog} from './09-protected'

// const newAnimal = new Animal('any') // TypeScript error
// console.log(newAnimal.greeting())

const max = new Dog('max', 'ivan')
console.log(max.greeting())
max.woof(2)

```

### Singleton: constructor privado

* Singleton previene crear múltiples instancias de una clase.

* Es muy usado en Arquitectura de Software, pues ayuda a ahorrar uso de memoria.

```
class MyService {
  static instance: MyService | null = null;

  private constructor(private name: string) {}

  getName() {
    return this.name;
  }

  static create(name: string) {
    if (!MyService.instance) {
      console.log('unica vez');
      MyService.instance = new MyService(name);
    }
    return MyService.instance;
  }
}

const myService1 = MyService.create('service 1');
console.log(myService1.getName()); // service 1

const myService2 = MyService.create('service 2');
console.log(myService2.getName()); // service 1

const myService3 = MyService.create('service 3');
console.log(myService3.getName()); // service 1
```

## Asincronismo y consumo de APIs
### Promesas

Instalamos axios ya que no tenemos fetch en NodeJS


```
npm install axios
```

Ejercicio retornando una promesa


```
(async () => {
  function delay(time: number) {
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve(true), time);
    });
    return promise; // Promise<unknow>
  }

  const rta = await delay(3000) //unknow
  console.log(rta)

})();


```

* En el anterior ejercicio la función delay retorna de manera implicita una **Promise<unknow>**, que corresponde a una promesa pero se desconoce el resultado de esta, luego cuando llamamos la función esta retorna la promesa resuelta por eso ahora es de tipo **unknow**

* Para indicarle el tipo de dato que retorna la respuesta de la promesa usamos un genérico

```
(async () => {
  function delay(time: number) {
    const promise = new Promise<boolean>((resolve) => { // => generic in this line
      setTimeout(() => resolve(true), time);
    });
    return promise; 
  }

  const rta = await delay(3000)
  console.log(rta)

})();

```

### Tipando respuestas HTTP


_Función Original_

```
import axios from 'axios';

(async () => {
  async function getProducts() {
    const rta = await axios.get('https://api.escuelajs.co/api/v1/products');
    return rta.data;
  }
  const rta = await getProducts();
  console.log(rta);
})();

```


Usando Axios la funcion retorna Promise<any> lo que puede generar problemas al no tener control del tipo. En este caso vamos a esperar un array de Products, para ello vamos a construir el modelo.

Nota: Para construir rápidamente una interface a modo de hack, es pegar el mock de un objeto en la siguiente herramienta  [QuickType](https://quicktype.io/), seleccionamos typescript como lenguaje y decimos que salida serán interfaces


Primer forma de tipar nuestra funcion que retorna la respuesta de request, para este caso firmamos el retorno de la función

```
import axios from 'axios';
import { Product } from './models/Product.model';

(async () => {
  async function getProducts(): Promise<Product[]> {
    const rta = await axios.get('https://api.escuelajs.co/api/v1/products');
    return rta.data;
  }
  const rta = await getProducts();
  console.log(rta);
})();

```

La desventaja de esta opción es que solo lo estamos tipando hacia afuera, pero no maneja un correcto control del tipado al interior de la función.


Otra opción hacer lo siguiente, es cuando la librería lo soporta:

```
import axios from 'axios';
import { Product } from './models/Product.model';

(async () => {
  async function getProducts(){
    const {data} = await axios.get<Product[]>('https://api.escuelajs.co/api/v1/products');
    return data;
  }
  const rta = await getProducts();
  rta.map(item => console.log(`${item.id} - ${item.title}`))
})();
  
```

Con esta opción podemos tener acceso a los métodos según el tipo desde adentro de la función. En caso que la librería no soporte la sintaxis lo que podemos hacer es castear el tipo en la respuesta del request desde una instancia.

```
import axios from 'axios';
import { Product } from './models/Product.model';

(async () => {
  async function getProducts(){
    const rta = await axios.get('https://api.escuelajs.co/api/v1/products');
    const data = rta.data as Product[]
    return data;
  }
  const rta = await getProducts();
  rta.map(item => console.log(`${item.id} - ${item.title}`))
})();

```
Aplicar esta opción cuando la librería no soporte pasarle un genérico


## Aplicando interfaces para nuestros servicios

```

import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { Product } from './product.model';

export interface ProductService {
  create(data: CreateProductDto): Product | Promise<Product>;
  getAll(): Product[] | Promise<Product[]>;
  update(
    id: Product['id'],
    changes: UpdateProductDto
  ): Product | Promise<Product>;
  findOne(
    id: Product['id']
  ): Product | undefined | Promise<Product | undefined>;
}

```

Nuestros servicios pueden estar modelados para implementar en un método sincrono o consumiendo una Api Rest de manera sincrona por lo que cada request retorna una promesa

Se recomienda en la implementación de la interface permitir inferir a la clase el retorno de cada método asincrono

```

import axios from 'axios';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { ProductService } from '../models/product-service.model';
import { Product } from '../models/product.model';

export class ProductHttpService implements ProductService {
  private url = 'https://api.escuelajs.co/api/v1/products';

  async create(dto: CreateProductDto) {
    const {data} = await axios.post(this.url, dto)
    return data
  }
  async getAll() {
    const {data} = await axios.get<Product[]>(this.url)
    return data
  }
  async update(id: Product['id'], changes: UpdateProductDto) {
    const {data} = await axios.post(`${this.url}/${id}`, changes)
    return data
  }
  async findOne(id: Product['id']) {
    const {data} = await axios.get(`${this.url}/${id}`)
    return data
  }
}


```

## Genéricos

### Genérics

Los genérios es una utilidad utilidad que solo está disponible en ambiente de desarrollo, en Javascript no existe.

Los genéricos actuan como plantillas donde podemos indicar en varios puntos de nuestro código el tipo de tipado que corresponde evitando duplicar código y hacer overload. También permite inferir el flujo y salida  segun el tipo del valor de entrada.

```
import { Dog } from './09-protected';

function getValue<T>(value: T) {
  return value;
}

console.log(typeof getValue<number>(12).toString());
console.log(getValue<string>('ivan').toLocaleUpperCase());

const max = new Dog('Max', 'Ivan');
console.log(getValue<Dog>(max).greeting());
getValue<Dog>(max).woof(3)
getValue<Dog>(max).move();

function display<T>(data: T[]) {
  data.map((item, index) => console.log(++index, item));
  return data;
}

display<string>(['ivan', 'nana', 'matias', 'adrian']);
display<number>([1, 2, 3]);
display<Dog>([max]);

function getValue2<T, K extends keyof T>(obj:T, key:K){
  console.log(obj, obj[key])
}

getValue2(max, 'name')

```
### Generics en clases

Del siguiente código se infiere que service.data es de tipo string[]

```
export class BaseHttpService<TypeClass> {
  data: TypeClass[] = []
}

const service = new BaseHttpService<string>()
service.data
```


```
import axios from 'axios';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

export class BaseHttpService<TypeClass> {
  data: TypeClass[] = [];
  constructor(private url: string) {}

  async getAll() {
    const { data } = await axios.get<TypeClass[]>(this.url);
    return data;
  }
}

(async () => {
  const url1 = 'https://api.escuelajs.co/api/v1/products';
  const productService = new BaseHttpService<Product>(url1);
  const products = await productService.getAll();
  console.log('products', products.length);

  const url2 = 'https://api.escuelajs.co/api/v1/categories';
  const categoryService = new BaseHttpService<Category>(url2);
  const categories = await categoryService.getAll();
  console.log('categories', categories.length);
})();

```


### Generics en métodos

Podemos pasarle a un método un tipo diferente al de la clase, se recomienda cambiar el nombre de los generics para no confundirse.

```
import axios from 'axios';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { UpdateProductDto } from '../dtos/product.dto';

export class BaseHttpService<TypeClass> {
  data: TypeClass[] = [];
  constructor(protected url: string) {}

  async getAll() {
    const { data } = await axios.get<TypeClass[]>(this.url);
    return data;
  }

  async update<ID, DTO>(id: ID, changes: DTO) {
    const { data } = await axios.put(`${this.url}/${id}`, changes);
    return data;
  }
}

(async () => {
  const url1 = 'https://api.escuelajs.co/api/v1/products';
  const productService = new BaseHttpService<Product>(url1);
  const products = await productService.getAll();
  console.log('products', products.length);
  productService.update<Product['id'], UpdateProductDto>(1, {
    title: 'test',
    description: 'test description',
  });

  const url2 = 'https://api.escuelajs.co/api/v1/categories';
  const categoryService = new BaseHttpService<Category>(url2);
  const categories = await categoryService.getAll();
  console.log('categories', categories.length);
})();

```


```
import { BaseHttpService } from './base-http.service';
import { Product } from '../models/product.model';
import { UpdateProductDto } from '../dtos/product.dto';

export class ProductCRUDService {
  private url = 'https://api.escuelajs.co/api/v1/products';
  private http = new BaseHttpService<Product>(this.url);

  async update(id: Product['id'], dto: UpdateProductDto) {
    return this.http.update(id, dto);
  }
}

```

Ahora podemos tambien extender de una clase para agregar mas métodos de la instancia base

```
import { Product } from "../models/product.model";
import { BaseHttpService } from "./base-http.service";

export class ProductService extends BaseHttpService<Product>{
  otherFunction(){
    console.log(this.url)
  }
}

```

```
import { Product } from '../models/product.model';
import { UpdateProductDto } from '../dtos/product.dto';
import { ProductService } from './product-http2.service';

export class ProductCRUDService {
  private url = 'https://api.escuelajs.co/api/v1/products';
  private http = new ProductService(this.url);

  async update(id: Product['id'], dto: UpdateProductDto) {
    this.http.otherFunction()
    return this.http.update(id, dto);
  }
}

```

El tipo de la clase ya lo estamos pasando por ProductService asi que cuando se instancia ya no debemos pasarle el generic como se hacía con BaseHttpService

### Decoradores

Como ejercicio para trabajar con decoradores vamos a instalar class-validator, que es una librería que los implementa

```

  npm i class-validator --save

```


Los decoradores agregan validaciones o funcionalidades extra

Los decoradores son como las anotaciones en Java

Para habilitar el uso de decoradores debemos configurar el tsconfig para ellos descomentamos la línea experimentalDecorators, aun no es una funcionalidad nativa de JS

Los decoradores no se ejecutan mientras desarrollamos sino en runtime, para ello es util que los agreguemos en una structura de try/catch como lo es el caso de class-validator

NOTA: en el caso de un tipo enum opcional debemos indicar en el DTO a través de union types que este atributo puede ser del tipo enum o undefined para cuando no se instancie el atributo.

NOTA: class-validator asi como tiene decoradores tambien tiene funciones y puede que con el mismo nombre, para identificar a las primeras es por que inician con mayúscula


**Modelo**

```
export enum AccessType {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

export interface Category {
  id: number;
  name: string;
  image: string;
  access?: AccessType;
}

```


**DTO**

```
import { AccessType, Category } from '../models/category.model';
import {
  IsNotEmpty,
  Length,
  IsUrl,
  IsEnum,
  validateOrReject,
  IsOptional,
} from 'class-validator';

export interface ICreateCategoryDto extends Omit<Category, 'id'> {}

export class CreateCategoryDto implements ICreateCategoryDto {
  @IsNotEmpty()
  @Length(4, 100)
  name!: string;

  @IsNotEmpty()
  @IsUrl()
  image!: string;

  @IsOptional()
  @IsEnum(AccessType)
  access?: AccessType | undefined;
}

(async () => {
  try {
    const dto = new CreateCategoryDto();
    dto.name = 'abcd';
    dto.image = 'https://api.escuelajs.co/api/v1/products';
    await validateOrReject(dto)
  } catch (error) {
    console.log(error)
  }

  validateOrReject;
})();

```

### Examen

Estas son tus respuestas
Puedes revisar y cambiar las respuestas. Al terminar presiona “Calificar respuestas” para enviar las preguntas y conocer tu puntuación.
1.
"Por defecto en TypeScript las propiedades de una clase deben estar inicializadas", esto es:
Verdadero
CAMBIAR
2.
¿Cuál de las siguientes definiciones es la más adecuada para el tipo de acceso public en TypeScript?

Se puede acceder a las propiedades y métodos desde cualquier parte sin restricciones.
CAMBIAR
3.
¿Cuál de las siguientes definiciones es la más adecuada para el tipo de acceso private en TypeScript?

Solo se puede acceder a propiedades y métodos desde la misma clase.
CAMBIAR
4.
¿Cuál de las siguientes formas es la manera de definir un getter dentro de una clase?
get day() {
return this._day;
}

CAMBIAR
5.
¿Cuál de las siguientes formas es la manera de definir un setter dentro de una clase?
set month(newMonth: number) {
this._month = newMonth;
}

CAMBIAR
6.
¿Cuál de las siguientes formas es la manera correcta de heredar de una clase?
class Dog extends Animal{}

CAMBIAR
7.
¿Cuál de las siguientes definiciones es la más adecuada para el tipo de acceso protected en TypeScript?

Solo se puede acceder a propiedades y métodos desde la misma clase y las que lo hereden.
CAMBIAR
8.
"Cuando tengo propiedades o métodos estáticos debo crear una instancia de la clase", esto es:
Falso
CAMBIAR
9.
¿Cuál de las siguientes formas es la manera correcta de implementar una interface en una class?
PostgresDriver implements Driver {}
CAMBIAR
10.
"Puedo crear una instancia de una class abstracta", esto es:
Falso
CAMBIAR
11.
"El patrón singleton es un patrón de diseño de software que restringe la creación de instancias de una clase a una instancia única", esto es:
Verdadero
CAMBIAR
12.
¿Cuál es la forma correcta de tipar el retorno de una Promise en boolean?

Promise<boolean>

CAMBIAR
13.
¿Cuál es la forma correcta de tipar el retorno de un get de Axios con un array de el tipo Product?
axios.get<Product[]>
CAMBIAR
14.
¿Cuál es la forma correcta de tipar el retorno de método para que retorne un Product como promesa o como valor directo?
Promise<Product> | Product
CAMBIAR
15.
¿Cuál es la forma correcta de definir un Genérico en una función?
function get<T>(value: T) {
return value;
}

CAMBIAR
16.
¿Cuál es la forma correcta de definir un Genérico en una clase?
class BaseHttpService<T> {}


### React con TS
https://www.freecodecamp.org/news/typescript-for-react-developers/

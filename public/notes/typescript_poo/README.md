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

Ò

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

Los métodos definen el comportamiendo de los objetos

Los métodos en TS se tranta igual que las funciones

Podemos firmar el tipo que retorna un método, también usar literal types.


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

El acceso público quiere decir que podemos acceder a las propiedades y métodos del objeto desde el exterior.

Por defecto los atributos y métodos son de tipo public, aunque se puede agregar la palabra public lo que haria mas verbose el código, podemos trabajar de manera implicita el modo público sin agregar nada mas al código


En algunas ocasiones es necesario controlar el acceso a los atributos y no permitir ser modificados fuera de la clase, para ello podriamos agregar readonly a los atributos, sin embargo aunque no puedan ser modificados desde afuera de la clase, tampoco podrían ser modificados dentro de ella.

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

```


### Acceso privado

Con la palabra reservada private podemos controlar el acceso a los atributos y método desde fuera de la clase.

Los atributos privados los podemos exponer por medio de un método público que los retorne


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


Los setters son funciones de tipo void, no retorna nada y requieren que se les pase un parámetro

Es util los setters cuando tenemos reglas de modificación sobre los valores de los atributos de la clase

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

La clase que hereda lo hace a través de extends

Podemos agregar métodos nuevos en la clase hija de la forma tradicional pero si agregamos un atributo nuevo tenemos que recibir los atributos padre por medio del  constructor de la clase hija y los pasamos por super.

Los atributos nuevos, no requieren ser pasados por el constructor de la clase padre por medio de super.

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

Las interfaces en clases funcionan como contratos, nos permiten tipar tanto los atributos como los métodos.

Aquí no podemos utilizar encapsulamiento, por defecto todos los atributos y métodos son públicos.

Para utilizar una interface en una clase usamos **implements**
Este contrato es tanto como para los parámetros como para los métodos.

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

Singleton nos previene crear múltiples instancias de una clase.

Esto es muy usado en Arquitectura de Software, pues nos ayuda a ahorrar uso de memoria.

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

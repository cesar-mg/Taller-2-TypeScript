import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { studentData } from './studentData.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let dataTbody: HTMLElement = document.getElementById('data')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnCredtios: HTMLElement = document.getElementById("button-filterByCreditos")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputMinimo: HTMLInputElement = <HTMLInputElement> document.getElementById("minimo")!;
const inputMaximo: HTMLInputElement = <HTMLInputElement> document.getElementById("maximo")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();

renderCoursesInTable(dataCourses);

renderDataInTable(studentData);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderDataInTable(estudiantes: Student[]): void {
    console.log('Desplegando informacion');
    let estudiante = estudiantes[0]
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Codigo: </td> <td>${estudiante.codigo}</td>`;
    dataTbody.appendChild(trElement);

    let trElement2 = document.createElement("tr");
    trElement2.innerHTML = `<td>Cedula: </td> <td>${estudiante.cedula}</td>`;
    dataTbody.appendChild(trElement2);

    let trElement3 = document.createElement("tr");
    trElement3.innerHTML = `<td>Edad: </td> <td>${estudiante.edad}</td>`;
    dataTbody.appendChild(trElement3);

    let trElement4 = document.createElement("tr");
    trElement4.innerHTML = `<td>Dirección: </td> <td>${estudiante.direccion}</td>`;
    dataTbody.appendChild(trElement4);

    let trElement5 = document.createElement("tr");
    trElement5.innerHTML = `<td>Telefono: </td> <td>${estudiante.telefono}</td>`;
    dataTbody.appendChild(trElement5);
  }

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCreditos() { 
  let min = inputMinimo.value;
  let max = inputMaximo.value;
  min = (min == null) ? '0' : min;
  max = (max == null) ? '0' : max;
  clearDataInTable();
  let coursesFiltered: Course[] = searchCourseByCreds(min, max, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCreds(min: string, max: string, courses: Course[]) {
    return min === '' || max === '0' ? dataCourses : courses.filter( c =>( 
    c.credits.toString().localeCompare(min) >= 0 && c.credits.toString().localeCompare(max) <= 0)  );
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}

function clearDataInTable() {
  while (dataTbody.hasChildNodes()) {
    if (dataTbody.firstChild != null) {
      coursesTbody.removeChild(dataTbody.firstChild);
     
    }
  }
}
btnfilterByName.onclick = () => applyFilterByName();
btnCredtios.onclick = () => applyFilterByCreditos();


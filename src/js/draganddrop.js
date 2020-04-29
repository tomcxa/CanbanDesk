// export default function dnd(columnId = 0) {
//     // let draggedEl = null;
//     // let ghostEl = null;
//     // const column = document.querySelector('[data-column-id="0"]');
//     // const itemsEl = column.querySelector('.column-body');
//     // itemsEl.addEventListener('mousedown', (evt) => {
//     //     evt.preventDefault();
//     //     if (!evt.target.classList.contains('card')) {
//     //         return;
//     //     }
//     //     draggedEl = evt.target;
//     //     ghostEl = evt.target.cloneNode(true);
//     //     ghostEl.classList.add('dragged');
//     //     document.body.appendChild(ghostEl);
//     //     ghostEl.style.left = `${evt.pageX - ghostEl.offsetWidth / 2}px`;
//     //     ghostEl.style.top = `${evt.pageY - ghostEl.offsetHeight / 2}px`;
//     // });

//     // itemsEl.addEventListener('mousemove', (evt) => {
//     //     evt.preventDefault(); // не даём выделять элементы
//     //     // if (!draggedEl) {
//     //     //     return;
//     //     // }
//     //     ghostEl.style.left = `${evt.pageX - ghostEl.offsetWidth / 2}px`;
//     //     ghostEl.style.top = `${evt.pageY - ghostEl.offsetHeight / 2}px`;
//     // });
//     // // itemsEl.addEventListener('mouseleave', (evt) => {
//     // //     // при уходе курсора за границы контейнера - отменяем перенос
//     // //     // if (!draggedEl) {
//     // //     //     return;
//     // //     // }

//     // //     ghostEl.remove();
//     // //     ghostEl = null;
//     // //     draggedEl = null;
//     // // });

//     // itemsEl.addEventListener('mouseup', (evt) => {
//     //     if (!draggedEl) {
//     //         return;
//     //     }
//     //     const closest = document.elementFromPoint(evt.clientX, evt.clientY);
//     //     const { top } = closest.getBoundingClientRect();
//     //     if (evt.pageY > window.scrollY + top + closest.offsetHeight / 2) {
//     //         evt.currentTarget.insertBefore(draggedEl, closest.nextElementSibling);
//     //     } else {



//     //         evt.currentTarget.insertBefore(draggedEl, closest);
//     //     }


//     //     // document.body.removeChild(ghostEl);
//     //     ghostEl.remove();
//     //     draggedEl = null;

//     //     ghostEl = null;
//     // });
// }

// import dragula from 'dragula';

// export default function dnd() {
//     const containers = [...document.getElementsByClassName('column-body')];

//     dragula({ revertOnSpill: true });
// }

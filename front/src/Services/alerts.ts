import Swal from 'sweetalert2';

export function goodAlert(title: string = '', text: string = '') {
  Swal.fire(title, text, 'success');
}

export function badAlert(title: string = '', text: string = '') {
  Swal.fire(title, text, 'error');
}

import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  agora = new Date();
  ano = this.agora.getFullYear();
  title = `Meu Boró ${this.ano}`;
  total: number = 0;
  somatorio: any = `R$ ${this.total},00`;
  valorMax = 204;
  listaValores: any = [];
  listarVeloresDepositados: any = [];
  isChecked: boolean = false;

  constructor(private render: Renderer2){};

  ngOnInit(): void {
    this.gerarSequanciaDeDepositos();
  }

  ngAfterViewInit(): void {
    this.carregarValoresSelecionados();
    this.somarCheckados();
  }

  gerarSequanciaDeDepositos() {
    let i: any = 1;
    while (i <= this.valorMax) {
      if (!this.listaValores.includes(i)) {
        this.listaValores.push(i);
        i++;
      }
    }
  }

  somarCheckados() {
    this.total = 0;
    this.listarVeloresDepositados.forEach((element: any) => {
      this.total += parseInt(element);
    });
    this.somatorio = `R$ ${this.total},00`;
  }

  adicionarDepositoCheckado(event: any) {
    this.isChecked = event.target.checked;
    let value = event.target.value;

    if (this.isChecked) {
      this.listarVeloresDepositados.push(value);
      this.addLocalStorage(value);
      this.somarCheckados();
    } else {
      let index = this.listarVeloresDepositados.indexOf(value);
      index > -1 ? this.listarVeloresDepositados.splice(index, 1) : null;
      this.somarCheckados();
      this.removeLocalStorage(value);
    }
  }

  addLocalStorage(value: string) {
    localStorage.setItem(value, value);
  }

  removeLocalStorage(value: string) {
    localStorage.removeItem(value);
  }

  getLocalStorage() {
    const valores = Object.keys(localStorage);
    return valores;
  }

  carregarValoresSelecionados() {
    this.listarVeloresDepositados = this.getLocalStorage();
    this.listarVeloresDepositados.forEach((e: any) => {
      this.render.selectRootElement(`#checkbox${e}`).checked = true;
    });
  }
}

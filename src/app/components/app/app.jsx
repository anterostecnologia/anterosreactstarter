import React, { Component } from 'react';
import { render } from 'react-dom';
import '../../assets/css/app.css';
import './temp.css';
import 'font-awesome/css/font-awesome.min.css';
import AnterosMenu from "./AnterosMenu";
import AnterosMenuItem from "./AnterosMenuItem";
import {
    AnterosButton, AnterosMainLayout,
    AnterosHeader, AnterosFullScreen, AnterosNavigatorLinkDropdown,
    AnterosDropdownMenu, AnterosDropdownMenuItem
} from "anteros-react";







class App extends Component {
    constructor(props) {
        super(props);
        this.onBtnAbrirClick = this.onBtnAbrirClick.bind(this);
        this.onBtnFecharClick = this.onBtnFecharClick.bind(this);
        this.onLoadWhatsApp = this.onLoadWhatsApp.bind(this);
        this.winWhatsApp;
    }

    onBtnAbrirClick(event) {
        window.winWhatsApp = window.open();
        window.winWhatsApp.addEventListener("load", this.onLoadWhatsApp, false);
        window.winWhatsApp.location.href = "https://web.whatsapp.com";

    }

    onLoadWhatsApp(event) {
        console.log('abriu');
    }

    onBtnFecharClick(event) {
        window.winWhatsApp.close();
    }

    render() {
        let style = { "color": "white" };

        return (
            <AnterosMainLayout containerAppId="app" horizontal>
                <AnterosHeader logo={require('../../assets/img/ic_logo_gazin_flat.png')}>
                    <AnterosFullScreen />
                    <AnterosNavigatorLinkDropdown caption="Edson">
                        <AnterosDropdownMenu className="profile-dropdown-menu">
                            <AnterosDropdownMenuItem caption="Sair" icon="fa fa-power-off icon" onSelectMenuItem={this.onHandleLogout} />
                        </AnterosDropdownMenu>
                    </AnterosNavigatorLinkDropdown>
                </AnterosHeader>

                <AnterosMenu logo={require('../../assets/img/ic_logo_gazin_flat.png')}>
                    <AnterosMenuItem active id="mniCadastros" icon="fa fa-home white" caption="Cadastros">
                        <AnterosMenuItem active id="mniEmpresa" route="/home/empresas/consulta" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-home white" caption="Filiais" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo != "VENDEDOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniCargo" route="/home/cargos/consulta" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-play-circle-o white" caption="Cargos" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniColaborador" route="/home/colaboradores/consulta" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-address-card-o white" caption="Colaboradores"></AnterosMenuItem>
                        <AnterosMenuItem id="mniDepartamento" route="/home/departamentos/consulta" onSelectMenuItem={this.onSelectMenuItem} icon="zmdi zmdi-card white" caption="Departamentos" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo != "VENDEDOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniRegionais" route="/home/regionais/consulta" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-map-marker white" caption="Regionais" visible={this.props.isLoggedIn && ((this.props.user.cargo.tipoCargo == "ADMINISTRADOR") || (this.props.user.cargo.tipoCargo == "GERENTE_REGIONAL"))}></AnterosMenuItem>
                        <AnterosMenuItem id="mniLinhaProduto" route="/home/linhasproduto/consulta" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-th-list white" caption="Linhas de produto" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo != "VENDEDOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniTipoFeedback" route="/home/tiposfeedback/consulta" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-comments white" caption="Tipos de feedback" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo != "VENDEDOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniOfertaPromocao" route="/home/ofertaPromocao/consulta" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-bell white" caption="Ofertas / Promoções" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniPesquisa" route="/home/pesquisas/consulta" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-file-text white" caption="Pesquisas" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniIntencaoCompra" route="/home/intencoescompra/consulta" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-comment white" caption="Intenções de compra"></AnterosMenuItem>
                    </AnterosMenuItem>

                    <AnterosMenuItem id="mniDashboard" onSelectMenuItem={this.onSelectMenuItem} icon="zmdi zmdi-view-dashboard white" caption="Dashboard">
                        <AnterosMenuItem id="mniDashboardAdmin" route="/home/dashboard/admin" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-dashboard white" caption="Administrador" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniDashboardGerenteRegional" route="/home/dashboard/regional" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-dashboard white" caption="Gerente regional" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "GERENTE_REGIONAL"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniDashboardGerenteLoja" route="/home/dashboard/gerente" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-dashboard white" caption="Gerente loja" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "GERENTE_LOJA"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniDashboardGerenteDepartamento" route="/home/dashboard/departamento" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-dashboard white" caption="Gerente departamento" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "GERENTE_DEPARTAMENTO"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniDashboardVendedor" route="/home/dashboard/vendedor" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-dashboard white" caption="Vendedor" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "VENDEDOR"}></AnterosMenuItem>
                    </AnterosMenuItem>

                    <AnterosMenuItem id="mniRelatorios" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-address-card-o white" caption="Relatórios">
                        <AnterosMenuItem id="mniRelatorioSimplificado" onSelectMenuItem={this.onSelectMenuItem} route="/home/reports/relatoriosimplificado" icon="fa fa-list-alt white" caption="Relatório simplificado intenções de compra" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniRelatorioDetalhado" onSelectMenuItem={this.onSelectMenuItem} route="/home/reports/relatoriodetalhado" icon="fa fa-list-alt white" caption="Relatório detalhado intenções de compra" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniCuboResumoDia" onSelectMenuItem={this.onSelectMenuItem} route="/home/reports/cuboresumodia" icon="fa fa-cube white" caption="Cubo intenções dia" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniCuboResumoMes" onSelectMenuItem={this.onSelectMenuItem} route="/home/reports/cuboresumomes" icon="fa fa-cube white" caption="Cubo intenções mês" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniCuboResumoColaboradorDia" onSelectMenuItem={this.onSelectMenuItem} route="/home/reports/cuboresumocolaboradordia" icon="fa fa-cube white" caption="Cubo intenções dia colaborador" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniCuboResumoColaboradorMes" onSelectMenuItem={this.onSelectMenuItem} route="/home/reports/cuboresumocolaboradormes" icon="fa fa-cube white" caption="Cubo intenções mês colaborador" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniCuboFeedbackDia" onSelectMenuItem={this.onSelectMenuItem} route="/home/reports/cubofeedbackdia" icon="fa fa-cube white" caption="Cubo feedback dia" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniCuboFeedbackMes" onSelectMenuItem={this.onSelectMenuItem} route="/home/reports/cubofeedbackmes" icon="fa fa-cube white" caption="Cubo feedback mês" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniCuboFeedbackColaboradorDia" onSelectMenuItem={this.onSelectMenuItem} route="/home/reports/cubofeedbackcolaboradordia" icon="fa fa-cube white" caption="Cubo feedback colaborador dia" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniCuboFeedbackColaboradorMes" onSelectMenuItem={this.onSelectMenuItem} route="/home/reports/cubofeedbackcolaboradormes" icon="fa fa-cube white" caption="Cubo feedback colaborador mês" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniAcompanhamentoPesquisa" onSelectMenuItem={this.onSelectMenuItem} route="/home/reports/acompanhamentopesquisa" icon="fa fa-file-text white" caption="Acompanhamento de pesquisas" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                    </AnterosMenuItem>
                    <AnterosMenuItem id="mniMapas" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-address-card-o white" caption="Mapas">
                        <AnterosMenuItem id="mniMapaPorDtRegistro" onSelectMenuItem={this.onSelectMenuItem} route="/home/maps/mapapordtregistro" icon="fa fa-cube white" caption="Mapa intenções por data registro" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniMapaPorDtIntencao" onSelectMenuItem={this.onSelectMenuItem} route="/home/maps/mapapordtintencao" icon="fa fa-cube white" caption="Mapa intenções por data intenção" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                        <AnterosMenuItem id="mniMapaPorDtConcretizacao" onSelectMenuItem={this.onSelectMenuItem} route="/home/maps/mapapordtconcretizacao" icon="fa fa-cube white" caption="Mapa intenções por data concretização" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}>
                            <AnterosMenuItem id="mniMapaPorDtRegistro1" onSelectMenuItem={this.onSelectMenuItem} route="/home/maps/mapapordtregistro" icon="fa fa-cube white" caption="Mapa intenções por data registro" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                            <AnterosMenuItem id="mniMapaPorDtIntencao1" onSelectMenuItem={this.onSelectMenuItem} route="/home/maps/mapapordtintencao" icon="fa fa-cube white" caption="Mapa intenções por data intenção" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                            <AnterosMenuItem id="mniMapaPorDtConcretizacao1" onSelectMenuItem={this.onSelectMenuItem} route="/home/maps/mapapordtconcretizacao" icon="fa fa-cube white" caption="Mapa intenções por data concretização" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                            <AnterosMenuItem id="mniMapaPorDtConcretizacao3" onSelectMenuItem={this.onSelectMenuItem} route="/home/maps/mapapordtconcretizacao" icon="fa fa-cube white" caption="Mapa intenções por data concretização" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}>
                                <AnterosMenuItem id="mniMapaPorDtRegistro4" onSelectMenuItem={this.onSelectMenuItem} route="/home/maps/mapapordtregistro" icon="fa fa-cube white" caption="Mapa intenções por data registro" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                                <AnterosMenuItem id="mniMapaPorDtConcretizacao5" onSelectMenuItem={this.onSelectMenuItem} route="/home/maps/mapapordtconcretizacao" icon="fa fa-cube white" caption="Mapa intenções por data concretização" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}>
                                    <AnterosMenuItem id="mniMapaPorDtRegistro5" onSelectMenuItem={this.onSelectMenuItem} route="/home/maps/mapapordtregistro" icon="fa fa-cube white" caption="Mapa intenções por data registro" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                                    <AnterosMenuItem id="mniMapaPorDtIntencao5" onSelectMenuItem={this.onSelectMenuItem} route="/home/maps/mapapordtintencao" icon="fa fa-cube white" caption="Mapa intenções por data intenção" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                                    <AnterosMenuItem id="mniMapaPorDtConcretizacao5" onSelectMenuItem={this.onSelectMenuItem} route="/home/maps/mapapordtconcretizacao" icon="fa fa-cube white" caption="Mapa intenções por data concretização" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                                </AnterosMenuItem>
                                <AnterosMenuItem id="mniMapaPorDtIntencao4" onSelectMenuItem={this.onSelectMenuItem} route="/home/maps/mapapordtintencao" icon="fa fa-cube white" caption="Mapa intenções por data intenção" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                                <AnterosMenuItem id="mniMapaPorDtConcretizacao4" onSelectMenuItem={this.onSelectMenuItem} route="/home/maps/mapapordtconcretizacao" icon="fa fa-cube white" caption="Mapa intenções por data concretização" visible={this.props.isLoggedIn && this.props.user.cargo.tipoCargo == "ADMINISTRADOR"}></AnterosMenuItem>
                            </AnterosMenuItem>
                        </AnterosMenuItem>
                    </AnterosMenuItem>
                </AnterosMenu>
            </AnterosMainLayout>
        );
    }
}

export default App;


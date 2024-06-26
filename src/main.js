// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Primevue from "primevue/config";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

import i18n from "./i18n";

import "@/assets/global.css";
import "primevue/resources/themes/aura-light-green/theme.css";

import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Dialog from "primevue/dialog";
import FormContainer from "@/components/form/FormContainer.vue";
import Field from "@/components/form/Field.vue";
import InputText from "primevue/inputtext";
import Navigation from "@/components/ui/navigation/Navigation.vue";
import Menubar from "primevue/menubar";
import Card from "primevue/card";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Message from "primevue/message";
import ConfirmDialog from "primevue/confirmdialog";
import ButtonGroup from "primevue/buttongroup";
import Textarea from "primevue/textarea";
import ProgressSpinner from "primevue/progressspinner";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import VText from "@/components/ui/css-based/Text.vue";
import BadgeDirective from "primevue/badgedirective";
import TieredMenu from "primevue/tieredmenu";
import Dropdown from 'primevue/dropdown';
import InputNumber from "primevue/inputnumber";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import firebasePlugin from "@/plugins/firebasePlugin";
import VueScreen from 'vue-screen'

const app = createApp(App);

app.use(store);
app.use(firebasePlugin);
app.use(i18n)
app.use(BadgeDirective);
app.use(router);
app.use(Primevue);
app.use(ToastService);
app.use(ConfirmationService);
app.use(VueScreen)

app.component("Accordion", Accordion);
app.component("Column", Column);
app.component("DataTable", DataTable);
app.component("TieredMenu", TieredMenu);
app.component("AccordionTab", AccordionTab);
app.component("InputNumber", InputNumber);
app.component("Dialog", Dialog);
app.component("InputText", InputText);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("ButtonGroup", ButtonGroup);
app.component("Dropdown", Dropdown);
app.component("FormContainer", FormContainer);
app.component("Field", Field);
app.component("Navigation", Navigation);
app.component("Menubar", Menubar);
app.component("Text", VText);
app.component("ProgressSpinner", ProgressSpinner);
app.component("Button", Button);
app.component("Card", Card);
app.component("Message", Message);
app.component("Avatar", Avatar);
app.component("ConfirmDialog", ConfirmDialog);
app.component("Textarea", Textarea);

app.mount("#app");

// TODOS
    // TODO: Добавить что то в Home
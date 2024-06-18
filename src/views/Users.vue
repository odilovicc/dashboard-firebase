<template>
  <div v-if="loading === true">
    <ProgressSpinner/>
  </div>
  <div v-if="loading === false && data.length > 0">
    <Accordion :activeIndex="0">
      <AccordionTab :header="data.username" v-for="(data, index) in data" :key="data.id">
        <ol class="m-0">
          <li>Username: <span class="font-bold">{{ data.username }}</span></li>
          <li>Email: <span class="font-bold">{{ data.email }}</span></li>
          <li>Address: <span class="font-bold">{{ data.address }}</span></li>
        </ol>
        <div class="mt-4 flex items-center gap-2">
          <Button label="Edit" @click="openEdit(data, index)"/>
          <Button label="Delete" severity="danger" @click="deleteData(data.id)"/>
        </div>
      </AccordionTab>
    </Accordion>
  </div>

  <!--  Dialog-->
  <Dialog @hide="activeData = {}" v-model:visible="isDialogOpen" modal header="Edit data" :style="{ width: '25rem' }">
    <template #default>
      <form-container>
        <field label="Username">
          <input-text placeholder="Username" v-model:model-value="editedData.username"/>
        </field>
        <field label="Email">
          <input-text type="email" placeholder="Email" v-model:model-value="editedData.email"/>
        </field>
      </form-container>
    </template>
    <template #footer>
      <div class="flex justify-content-end gap-2">
        <Button type="button" label="Cancel" @click="isDialogOpen === false" severity="secondary"></Button>
        <Button type="button" label="Save" @click="editData(activeData.id)"></Button>
      </div>
    </template>
  </Dialog>
  <!--  Dialog-->
</template>

<script>
import axios from "axios";
import ProgressSpinner from "primevue/progressspinner";
import Button from 'primevue/button'

export default {
  name: "Home",
  components: {
    ProgressSpinner,
    Button
  },
  data() {
    return {
      data: {},
      loading: false,
      activeData: {},
      editedData: {
        username: '',
        email: ''
      },
      isDialogOpen: false,
    };
  },
  methods: {
    async getData() {
      try {
        this.loading = true;
        const res = await axios.get("https://666aebb87013419182d1772d.mockapi.io/example" + "/users");
        this.data = res.data;
        this.loading = false;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    openEdit(data, index) {
      this.activeData = data
      this.isDialogOpen = true
    },
    async editData(id) {
      try {
        const res = await axios.put("https://666aebb87013419182d1772d.mockapi.io/example/users/" + id, {
          username: this.editedData.username,
          email: this.editedData.email
        })
        this.isDialogOpen = false
        await this.getData()
      } catch (e) {
        console.log(e)
      }
    },
    async deleteData(id) {
      try {
        await axios.delete("https://666aebb87013419182d1772d.mockapi.io/example/users/" + id)
        this.getData()
      } catch (e) {
        console.log(e)
      }
    },
  },
  async mounted() {
    await this.getData()
  },
};
</script>

<style scoped></style>

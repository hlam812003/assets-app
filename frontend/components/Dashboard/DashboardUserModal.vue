<template>
    <div id="DashboardUserModal" class="user__modal--container">
        <div :class="[
            'user__modal--wrapper', 
            'animate__animated', 
            isClosing ? 'animate__fadeOutUp' : 'animate__fadeInDown', 
            'animate__fast']"
            >
            <div class="user__modal--header">
                <img src="/leaveIcon.png" class="close__modal" @click="emitClose">
                <p class="user__modal--headerText">Edit User Infomation</p>
            </div>
            <div class="user__modal--body">
                <div class="user__modal--bodyTop">
                    <div class="user__modal--bodyTop-left">
                        <div class="user__modal--bodyTop-leftItem">
                            <div class="user__modal--bodyTop-leftItemTitle">First name:</div>
                            <input type="text" v-model="localUser.first_name" :class="{ 'disabled': !isEditable }" name="userFirstName" id="userFirstName" :readonly="!isEditable"/>
                        </div>
                        <div class="user__modal--bodyTop-leftItem">
                            <div class="user__modal--bodyTop-leftItemTitle">Last name:</div>
                            <input type="text" v-model="localUser.last_name" :class="{ 'disabled': !isEditable }" name="userLastName" id="userLastName" :readonly="!isEditable"/>
                        </div>
                        <div class="user__modal--bodyTop-leftItem">
                            <div class="user__modal--bodyTop-leftItemTitle">Department:</div>
                            <div class="modal__select--btn" :class="{ 'disabled': !isEditable }" :disabled="!isEditable" @click="toggleDepartmentMenu()">
                                <span>{{ localUser.department_id }}</span>
                                <img src="/caretIcon.png">
                                <div class="select__menu--wrapper" v-if="showDepartmentMenu  && isEditable">
                                  <div
                                    class="select__menu--item"
                                    v-for="department in departmentList"
                                    :key="department"
                                    @click="updateDepartment(Number(department))"
                                  >
                                    {{ department }}
                                  </div>
                                </div>
                            </div>
                        </div>
                        <div class="user__modal--bodyTop-leftItem">
                            <div class="user__modal--bodyTop-leftItemTitle">Role:</div>
                            <div class="modal__select--btn" :class="{ 'disabled': !isEditable }" :disabled="!isEditable" @click="toggleRoleMenu()">
                                <span>{{ localUser.role }}</span>
                                <img src="/caretIcon.png">
                                <div class="select__menu--wrapper" v-if="showRoleMenu && isEditable">
                                  <div
                                    class="select__menu--item"
                                    v-for="role in roleList"
                                    :key="role"
                                    @click="updateRole(role)"
                                  >
                                    {{ role }}
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="user__modal--bodyTop-right">
                        <div class="user__modal--bodyTop-rightItem">
                            <div class="user__modal--bodyTop-rightItemTitle test">User id:</div>
                            <input type="text" v-model="localUser.user_id" class="bg-[#dbdbdb] cursor-not-allowed" name="userId" id="userId" readonly/>
                        </div>
                        <div class="user__modal--bodyTop-rightItem">
                            <div class="user__modal--bodyTop-rightItemTitle test2">Username:</div>
                            <input type="text" v-model="localUser.username" :class="{ 'disabled': !isEditable }" name="userName" id="userName" :readonly="!isEditable"/>
                        </div>
                        <!-- <div class="user__modal--bodyTop-rightItem">
                            <div class="user__modal--bodyTop-rightItemTitle test2">Password:</div>
                            <input type="text" v-model="localUser.asset_name" :class="{ 'disabled': !isEditable, 'not__allowed': !isAdmin }" name="assetName" id="assetName" :readonly="!isAdmin || !isEditable"/>
                        </div> -->
                    </div>
                </div>
                <div class="user__modal--actions">
                    <button class="user__btn add" @click="handleUpdate">accept</button>
                    <button class="user__btn edit" @click="toggleEdit">edit</button>
                    <!-- @click="handleDelete" -->
                    <button class="user__btn delete" >delete</button>
                </div>
            </div>
            <div class="user__modal--footer">
                Input Day :
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import userService from '~/services/user.services';
import { useUserStore } from '~/stores/User';

const isClosing = ref(false);
const isEditable = ref(false);
const showDepartmentMenu = ref(false);
const showRoleMenu = ref(false);

const userStore = useUserStore();

const departmentList = [
    '1', 
    '2', 
    '3'
];

const roleList = [
    'Admin',    
    'Manager',
];

const emit = defineEmits(['close', 'updateSuccess']);

const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

const localUser = reactive({ ...props.user });

const emitClose = () => {
    isClosing.value = true;
    setTimeout(() => {
        emit('close');
    }, 750);
};

const toggleDepartmentMenu = () => {
  if (isEditable.value) {
    showDepartmentMenu.value = !showDepartmentMenu.value;
    if(showRoleMenu.value) showRoleMenu.value = false; 
  }
};

const toggleRoleMenu = () => {
  if (isEditable.value) {
    showRoleMenu.value = !showRoleMenu.value;
    if(showDepartmentMenu.value) showDepartmentMenu.value = false;
  }
};

const toggleEdit = () => {
    isEditable.value = !isEditable.value;
    showDepartmentMenu.value = false;
    showRoleMenu.value = false; 
};

const toast = useToast();

const handleUpdate = async () => {
    if (userStore.userInfo?.user_id === localUser.user_id && userStore.userInfo?.role !== localUser.role) {
        toast.add({
            title: 'Error!',
            icon: 'i-heroicons-no-symbol-solid',
            color: 'red',
            description: 'You can not edit your own role!',
            timeout: 3000
        });
        return;
    };

    const updateData = {
        
        firstName: localUser.first_name,
        lastName: localUser.last_name,
        departmentId: localUser.department_id,
        role: userStore.userInfo?.user_id === localUser.user_id ? userStore.userInfo?.role : localUser.role,
        username: localUser.username,
        password: localUser.password,
    };

    await userService.updateUser(localUser.user_id, updateData).then(() => {
        toast.add({
            title: 'Successful!',
            icon: 'i-heroicons-check-circle-solid',
            color: 'green',
            description: `User ${localUser.user_id} updated successfully!`,
            timeout: 3000
        });

        isEditable.value = false;
        emit('close');
        emit('updateSuccess');
    }).catch((err) => {
        toast.add({
            title: 'Error!',
            icon: 'i-heroicons-no-symbol-solid',
            color: 'red',
            description: 'Failed to update user, please try again!',
            timeout: 3000
        });
        console.error('Failed to update user', err);
    });
};

// const handleDelete = async () => {
//     await userService.deleteAsset(localUser.asset_id).then(() => {
//         toast.add({
//             title: 'Delete Successfully!',
//             icon: 'i-heroicons-check-circle-solid',
//             color: 'green',
//             description: `Asset ${localUser.asset_id} deleted successfully!`,
//             timeout: 3000
//         });
//         emit('close');
//         emit('updateSuccess');
//     }).catch((err: any) => {
//         toast.add({
//             title: 'Error!',
//             icon: 'i-heroicons-no-symbol-solid',
//             color: 'red',
//             description: 'Failed to delete asset, please try again!',
//             timeout: 3000
//         })
//         console.error('Failed to delete asset', err);  
//     })
// };

function updateDepartment(departmentId: number) {
    localUser.department_id = departmentId;
    showDepartmentMenu.value = false;
};

function updateRole(role: string) {
    localUser.role = role;
    showRoleMenu.value = false;
};


// const assetRefs = toRefs(localUser);
</script>

<style scoped>
@import url("~/assets/css/Dashboard/DashboardUserModal.css");
</style>
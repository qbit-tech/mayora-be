import { PERMISSIONS_CRUD, PERMISSIONS_CRUD_WITHOUT_DELETE, PERMISSIONS_CRUD_WITHOUT_DETAIL, PERMISSIONS_LIST, PERMISSIONS_LIST_CREATE_UPDATE, PERMISSIONS_LIST_UPDATE, PERMISSIONS_VIEW } from './predefinedPermission.constant';

export const FEATURE_PERMISSIONS = {
    AUTH: {
        __type: 'AUTH',
        __title: 'Auth',
        __description: 'Auth permission',
        LOGIN_MOBILE_APP_CUSTOMER: {
            __type: 'LOGIN_MOBILE_APP_CUSTOMER',
            __title: 'Login Mobile App',
            value: true,
        },
        LOGIN_CMS_ADMIN: {
            __type: 'LOGIN_CMS_ADMIN',
            __title: 'Login CMS Admin',
            value: true,
        },
    },
    USER: {
        __type: 'USER',
        __title: 'User',
        __description: 'Manage user',

        ...PERMISSIONS_CRUD_WITHOUT_DELETE,
        FORCE_DELETE_OTHER_USER: {
            __type: 'FORCE_DELETE_OTHER_USER',
            __title: 'Force delete other user',
            value: true,
        },
    },
    CATEGORY: {
        LIST: {
            value: true,
            __type: "LIST",
            __title: "List"
        },
        CREATE: {
            value: true,
            __type: "CREATE",
            __title: "Create"
        },
        DELETE: {
            value: true,
            __type: "DELETE",
            __title: "Delete"
        },
        DETAIL: {
            value: true,
            __type: "DETAIL",
            __title: "Detail"
        },
        UPDATE: {
            value: true,
            __type: "UPDATE",
            __title: "Update"
        },
        __type: "CATEGORY",
        __title: "CATEGORY",
        __description: "Manage Category"
    },
    CATEGORY_PARENT: {
        LIST: {
            value: true,
            __type: "LIST",
            __title: "List"
        },
        CREATE: {
            value: true,
            __type: "CREATE",
            __title: "Create"
        },
        DELETE: {
            value: true,
            __type: "DELETE",
            __title: "Delete"
        },
        DETAIL: {
            value: true,
            __type: "DETAIL",
            __title: "Detail"
        },
        UPDATE: {
            value: true,
            __type: "UPDATE",
            __title: "Update"
        },
        __type: "CATEGORY_PARENT",
        __title: "CATEGORY_PARENT",
        __description: "Manage Category Parent"
    },
    MACHINE: {
        LIST: {
            value: true,
            __type: "LIST",
            __title: "List"
        },
        CREATE: {
            value: true,
            __type: "CREATE",
            __title: "Create"
        },
        DELETE: {
            value: true,
            __type: "DELETE",
            __title: "Delete"
        },
        DETAIL: {
            value: true,
            __type: "DETAIL",
            __title: "Detail"
        },
        UPDATE: {
            value: true,
            __type: "UPDATE",
            __title: "Update"
        },
        __type: "MACHINE",
        __title: "MACHINE",
        __description: "Manage Machine"
    },
    USER_DETAIL: {
        LIST: {
            value: true,
            __type: "LIST",
            __title: "List"
        },
        CREATE: {
            value: true,
            __type: "CREATE",
            __title: "Create"
        },
        DELETE: {
            value: true,
            __type: "DELETE",
            __title: "Delete"
        },
        DETAIL: {
            value: true,
            __type: "DETAIL",
            __title: "Detail"
        },
        UPDATE: {
            value: true,
            __type: "UPDATE",
            __title: "Update"
        },
        __type: "USER_DETAIL",
        __title: "USER_DETAIL",
        __description: "Manage User Detail"
    },
    MANUAL_COLLECTION: {
        LIST: {
            value: true,
            __type: "LIST",
            __title: "List"
        },
        CREATE: {
            value: true,
            __type: "CREATE",
            __title: "Create"
        },
        DELETE: {
            value: true,
            __type: "DELETE",
            __title: "Delete"
        },
        DETAIL: {
            value: true,
            __type: "DETAIL",
            __title: "Detail"
        },
        UPDATE: {
            value: true,
            __type: "UPDATE",
            __title: "Update"
        },
        __type: "MANUAL_COLLECTION",
        __title: "MANUAL_COLLECTION",
        __description: "Manage Manual Collection"
    },
    TROUBLE: {
        LIST: {
            value: true,
            __type: "LIST",
            __title: "List"
        },
        CREATE: {
            value: true,
            __type: "CREATE",
            __title: "Create"
        },
        DELETE: {
            value: true,
            __type: "DELETE",
            __title: "Delete"
        },
        DETAIL: {
            value: true,
            __type: "DETAIL",
            __title: "Detail"
        },
        UPDATE: {
            value: true,
            __type: "UPDATE",
            __title: "Update"
        },
        __type: "TROUBLE",
        __title: "TROUBLE",
        __description: "Manage Troble"
    },
    FAQ: {
        __type: 'FAQ',
        __title: 'FAQ',
        __description: 'Manage FAQ',

        ...PERMISSIONS_CRUD,
    },
    FAQ_GROUP: {
        __type: 'FAQ_GROUP',
        __title: 'FAQ Group',
        __description: 'Manage FAQ Group',

        ...PERMISSIONS_CRUD,
    },
    ROLE: {
        __type: 'ROLE',
        __title: 'Role',
        __description: 'Manage role',

        ...PERMISSIONS_CRUD,
    },
    TAG: {
        __type: 'TAG',
        __title: 'Tag',
        __description: 'Manage tag',

        ...PERMISSIONS_CRUD,
    },
    STORE: {
        __type: 'STORE',
        __title: 'Store',
        __description: 'Manage region',

        ...PERMISSIONS_CRUD,
    },
    REGION: {
        __type: 'REGION',
        __title: 'Region',
        __description: 'Manage region',

        ...PERMISSIONS_CRUD,
    },
};
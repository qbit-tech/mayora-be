PGDMP         	                {            mayora    14.5    14.5 R    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    33852    mayora    DATABASE     f   CREATE DATABASE mayora WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_Indonesia.1252';
    DROP DATABASE mayora;
                postgres    false            �           1247    42122    status    TYPE     B   CREATE TYPE public.status AS ENUM (
    'valid',
    'invalid'
);
    DROP TYPE public.status;
       public          postgres    false            �            1259    33902    MstCategory    TABLE     O  CREATE TABLE public."MstCategory" (
    id character varying(255) NOT NULL,
    "categoryParentId" character varying(100) NOT NULL,
    name character varying(100),
    "categoryLevel" character varying(100),
    "createdBy" character varying(100),
    "createdAt" date,
    "updatedBy" character varying(100),
    "updatedAt" date
);
 !   DROP TABLE public."MstCategory";
       public         heap    postgres    false            �            1259    42084    MstCategoryLog    TABLE     O  CREATE TABLE public."MstCategoryLog" (
    id character varying(255) NOT NULL,
    "categoryParentId" character varying(100) NOT NULL,
    name character varying(100),
    "categoryId" character varying(255),
    "createdBy" character varying(100),
    "createdAt" date,
    "updatedBy" character varying(100),
    "updatedAt" date
);
 $   DROP TABLE public."MstCategoryLog";
       public         heap    postgres    false            �            1259    33895    MstCategoryParent    TABLE     U  CREATE TABLE public."MstCategoryParent" (
    id character varying(255) NOT NULL,
    name character varying(100) NOT NULL,
    "categoryParentId" character varying(100),
    "categoryLevel" character varying(100),
    "createdBy" character varying(100),
    "createdAt" date,
    "updatedBy" character varying(100),
    "updatedAt" date
);
 '   DROP TABLE public."MstCategoryParent";
       public         heap    postgres    false            �            1259    42049    MstCategoryParentLog    TABLE     �  CREATE TABLE public."MstCategoryParentLog" (
    id character varying(255) NOT NULL,
    name character varying(100) NOT NULL,
    "categoryParentId" character varying(100),
    "categoryLevel" character varying(100),
    "createdBy" character varying(100),
    "createdAt" date,
    "updatedBy" character varying(100),
    "updatedAt" date,
    "mstCategoryParentId" character varying(255)
);
 *   DROP TABLE public."MstCategoryParentLog";
       public         heap    postgres    false            �            1259    33853 
   MstMachine    TABLE       CREATE TABLE public."MstMachine" (
    id character varying NOT NULL,
    name character varying NOT NULL,
    status character varying NOT NULL,
    "updatedBy" character varying,
    "createdBy" character varying,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL
);
     DROP TABLE public."MstMachine";
       public         heap    postgres    false            �            1259    42116    MstReportTemplate    TABLE       CREATE TABLE public."MstReportTemplate" (
    id character varying(255) NOT NULL,
    type character varying(100),
    "fileTemplate" character varying(255),
    "createdAt" date,
    "createdBy" character varying(100),
    "updatedBy" character varying(100),
    "updatedAt" date
);
 '   DROP TABLE public."MstReportTemplate";
       public         heap    postgres    false            �            1259    42108    MstReportTemplateLog    TABLE     N  CREATE TABLE public."MstReportTemplateLog" (
    id character varying(255) NOT NULL,
    "reportTemplateId" character varying(255),
    type character varying(100),
    "fileTemplate" character varying(255),
    "createdAt" date,
    "createdBy" character varying(100),
    "updatedBy" character varying(100),
    "updatedAt" date
);
 *   DROP TABLE public."MstReportTemplateLog";
       public         heap    postgres    false            �            1259    33860    MstRole    TABLE     �   CREATE TABLE public."MstRole" (
    id character varying NOT NULL,
    name character varying NOT NULL,
    "createdBy" character varying,
    "createdAt" character varying,
    "updatedBy" character varying,
    "updatedAt" date
);
    DROP TABLE public."MstRole";
       public         heap    postgres    false            �            1259    33867    MstUser    TABLE     y  CREATE TABLE public."MstUser" (
    id character varying(255) NOT NULL,
    "roleId" character varying(255) NOT NULL,
    name character varying(100),
    email character varying(100),
    password text,
    identifier text,
    status public.status,
    "createdBy" character varying(100),
    "createdAt" date,
    "updatedBy" character varying(100),
    "updatedAt" date
);
    DROP TABLE public."MstUser";
       public         heap    postgres    false    937            �            1259    33874    MstUserDetail    TABLE     �   CREATE TABLE public."MstUserDetail" (
    "userId" character varying(255) NOT NULL,
    "machineId" text,
    "createdBy" character varying(100),
    "createdAt" date,
    "updatedBy" character varying(100),
    "updatedAt" date
);
 #   DROP TABLE public."MstUserDetail";
       public         heap    postgres    false            �            1259    42059    MstUserDetailLog    TABLE     
  CREATE TABLE public."MstUserDetailLog" (
    "userId" character varying(255),
    "machineId" text,
    "createdBy" character varying(100),
    "createdAt" date,
    "updatedBy" character varying(100),
    "updatedAt" date,
    id character varying(255) NOT NULL
);
 &   DROP TABLE public."MstUserDetailLog";
       public         heap    postgres    false            �            1259    42094 
   MstUserLog    TABLE     �  CREATE TABLE public."MstUserLog" (
    id character varying(255) NOT NULL,
    "roleId" character varying(255) NOT NULL,
    name character varying(100),
    email character varying(100),
    password text,
    "userId" character varying(255),
    status public.status,
    "createdBy" character varying(100),
    "createdAt" date,
    "updatedBy" character varying(100),
    "updatedAt" date
);
     DROP TABLE public."MstUserLog";
       public         heap    postgres    false    937            �            1259    33888    TrxActualRelease    TABLE       CREATE TABLE public."TrxActualRelease" (
    id character varying(255) NOT NULL,
    "machineId" character varying(255),
    date date,
    amount integer,
    "createdAt" date,
    "updatedAt" date,
    "createdBy" character varying(100),
    "updatedBy" character varying(100)
);
 &   DROP TABLE public."TrxActualRelease";
       public         heap    postgres    false            �            1259    42074    TrxActualReleaseLog    TABLE     E  CREATE TABLE public."TrxActualReleaseLog" (
    id character varying(255) NOT NULL,
    "machineId" character varying(255),
    date date,
    amount integer,
    "createdAt" date,
    "updatedAt" date,
    "createdBy" character varying(100),
    "updatedBy" character varying(100),
    "troubleId" character varying(255)
);
 )   DROP TABLE public."TrxActualReleaseLog";
       public         heap    postgres    false            �            1259    33916    TrxDefaultTarget    TABLE       CREATE TABLE public."TrxDefaultTarget" (
    id character varying(255) NOT NULL,
    "machineId" character varying(255),
    target integer,
    "createdAt" date,
    "updatedAt" date,
    "createdBy" character varying(100),
    "updatedBy" character varying(100)
);
 &   DROP TABLE public."TrxDefaultTarget";
       public         heap    postgres    false            �            1259    42064    TrxDefaultTargetLog    TABLE     <  CREATE TABLE public."TrxDefaultTargetLog" (
    id character varying(255) NOT NULL,
    "machineId" character varying(255),
    target integer,
    "createdAt" date,
    "updatedAt" date,
    "createdBy" character varying(100),
    "updatedBy" character varying(100),
    "defaultTargetId" character varying(255)
);
 )   DROP TABLE public."TrxDefaultTargetLog";
       public         heap    postgres    false            �            1259    33944    TrxManualCollection    TABLE     T  CREATE TABLE public."TrxManualCollection" (
    id character varying(255) NOT NULL,
    "machineId" character varying(255),
    "categoryId" character varying(255),
    value text,
    shift text,
    remark text,
    "createdAt" date,
    "createdBy" character varying(100),
    "updatedAt" date,
    "updatedBy" character varying(100)
);
 )   DROP TABLE public."TrxManualCollection";
       public         heap    postgres    false            �            1259    42069    TrxManualCollectionLog    TABLE     b  CREATE TABLE public."TrxManualCollectionLog" (
    id character varying(255) NOT NULL,
    "defectReworkLossesId" character varying(255),
    "categoryId" character varying(255),
    value text,
    shift text,
    remark text,
    "createdAt" date,
    "createdBy" character varying(100),
    "updatedAt" date,
    "updatedBy" character varying(100)
);
 ,   DROP TABLE public."TrxManualCollectionLog";
       public         heap    postgres    false            �            1259    33930    TrxOEETarget    TABLE       CREATE TABLE public."TrxOEETarget" (
    id character varying(255) NOT NULL,
    "machineId" character varying(255),
    target text,
    "createdAt" date,
    "updatedAt" date,
    "createdBy" character varying(100),
    "updatedBy" character varying(100)
);
 "   DROP TABLE public."TrxOEETarget";
       public         heap    postgres    false            �            1259    42089    TrxOEETargetLog    TABLE     1  CREATE TABLE public."TrxOEETargetLog" (
    id character varying(255) NOT NULL,
    "machineId" character varying(255),
    target text,
    "createdAt" date,
    "updatedAt" date,
    "createdBy" character varying(100),
    "updatedBy" character varying(100),
    "OEETargetId" character varying(255)
);
 %   DROP TABLE public."TrxOEETargetLog";
       public         heap    postgres    false            �            1259    33923    TrxProductionTarget    TABLE     6  CREATE TABLE public."TrxProductionTarget" (
    id character varying(255) NOT NULL,
    "machineId" character varying(255),
    target integer,
    "activeTarget" time with time zone,
    "createdAt" date,
    "updatedAt" date,
    "createdBy" character varying(100),
    "updatedBy" character varying(100)
);
 )   DROP TABLE public."TrxProductionTarget";
       public         heap    postgres    false            �            1259    42054    TrxProductionTargetLog    TABLE     B  CREATE TABLE public."TrxProductionTargetLog" (
    id character varying(255) NOT NULL,
    "productionTargetId" character varying(255),
    target integer,
    "activeTarget" time with time zone,
    "createdAt" date,
    "updatedAt" date,
    "createdBy" character varying(100),
    "updatedBy" character varying(100)
);
 ,   DROP TABLE public."TrxProductionTargetLog";
       public         heap    postgres    false            �            1259    33881 
   TrxRelease    TABLE     �   CREATE TABLE public."TrxRelease" (
    id character varying(255) NOT NULL,
    "machineId" character varying(255),
    amount integer,
    "time" date,
    "createdAt" date,
    "updatedAt" date
);
     DROP TABLE public."TrxRelease";
       public         heap    postgres    false            �            1259    33937    TrxReportOEE    TABLE     �  CREATE TABLE public."TrxReportOEE" (
    id character varying(255) NOT NULL,
    "machineId" character varying(255),
    "OEE" character varying(100),
    "AV" character varying(100),
    "PE" character varying(100),
    "QR" character varying(100),
    date date,
    "createdAt" date,
    "updatedAt" date,
    "createdBy" character varying(100),
    "updatedBy" character varying(100)
);
 "   DROP TABLE public."TrxReportOEE";
       public         heap    postgres    false            �            1259    42044    TrxReportOEELog    TABLE     �  CREATE TABLE public."TrxReportOEELog" (
    id character varying(255) NOT NULL,
    "machineId" character varying(255),
    "OEE" character varying(100),
    "AV" character varying(100),
    "PE" character varying(100),
    "QR" character varying(100),
    date date,
    "createdAt" date,
    "updatedAt" date,
    "createdBy" character varying(100),
    "updatedBy" character varying(100),
    "reportOEEId" character varying(255)
);
 %   DROP TABLE public."TrxReportOEELog";
       public         heap    postgres    false            �            1259    33952 
   TrxStartup    TABLE     9  CREATE TABLE public."TrxStartup" (
    id character varying(255) NOT NULL,
    "machineId" character varying(255),
    "startTime" time with time zone,
    "endTime" time with time zone,
    "createdAt" date,
    "createdBy" character varying(100),
    "updatedAt" date,
    "updatedBy" character varying(100)
);
     DROP TABLE public."TrxStartup";
       public         heap    postgres    false            �            1259    33959    TrxStatusMachine    TABLE       CREATE TABLE public."TrxStatusMachine" (
    id character varying(255) NOT NULL,
    "machineId" character varying(255),
    status character varying(100),
    "createdAt" date,
    "createdBy" character varying(100),
    "updatedAt" date,
    "updatedBy" character varying(100)
);
 &   DROP TABLE public."TrxStatusMachine";
       public         heap    postgres    false            �            1259    33909 
   TrxTrouble    TABLE     O  CREATE TABLE public."TrxTrouble" (
    id character varying(255) NOT NULL,
    "machineId" character varying(255),
    "categoryId" character varying(255),
    "startTime" time with time zone,
    "endTime" time with time zone,
    remark text,
    status public.status,
    "createdAt" date,
    "createdBy" character varying(100)
);
     DROP TABLE public."TrxTrouble";
       public         heap    postgres    false    937            �            1259    42079    TrxTroubleLog    TABLE     R  CREATE TABLE public."TrxTroubleLog" (
    id character varying(255) NOT NULL,
    "machineId" character varying(255),
    "categoryId" character varying(255),
    "time" time with time zone,
    remark text,
    status public.status,
    "createdAt" date,
    "createdBy" character varying(100),
    "troubleId" character varying(255)
);
 #   DROP TABLE public."TrxTroubleLog";
       public         heap    postgres    false    937            �          0    33902    MstCategory 
   TABLE DATA           �   COPY public."MstCategory" (id, "categoryParentId", name, "categoryLevel", "createdBy", "createdAt", "updatedBy", "updatedAt") FROM stdin;
    public          postgres    false    216   �u       �          0    42084    MstCategoryLog 
   TABLE DATA           �   COPY public."MstCategoryLog" (id, "categoryParentId", name, "categoryId", "createdBy", "createdAt", "updatedBy", "updatedAt") FROM stdin;
    public          postgres    false    233   �u       �          0    33895    MstCategoryParent 
   TABLE DATA           �   COPY public."MstCategoryParent" (id, name, "categoryParentId", "categoryLevel", "createdBy", "createdAt", "updatedBy", "updatedAt") FROM stdin;
    public          postgres    false    215   �u       �          0    42049    MstCategoryParentLog 
   TABLE DATA           �   COPY public."MstCategoryParentLog" (id, name, "categoryParentId", "categoryLevel", "createdBy", "createdAt", "updatedBy", "updatedAt", "mstCategoryParentId") FROM stdin;
    public          postgres    false    226   �u                 0    33853 
   MstMachine 
   TABLE DATA           l   COPY public."MstMachine" (id, name, status, "updatedBy", "createdBy", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    209   �u       �          0    42116    MstReportTemplate 
   TABLE DATA           {   COPY public."MstReportTemplate" (id, type, "fileTemplate", "createdAt", "createdBy", "updatedBy", "updatedAt") FROM stdin;
    public          postgres    false    237   v       �          0    42108    MstReportTemplateLog 
   TABLE DATA           �   COPY public."MstReportTemplateLog" (id, "reportTemplateId", type, "fileTemplate", "createdAt", "createdBy", "updatedBy", "updatedAt") FROM stdin;
    public          postgres    false    236   6v       �          0    33860    MstRole 
   TABLE DATA           a   COPY public."MstRole" (id, name, "createdBy", "createdAt", "updatedBy", "updatedAt") FROM stdin;
    public          postgres    false    210   Sv       �          0    33867    MstUser 
   TABLE DATA           �   COPY public."MstUser" (id, "roleId", name, email, password, identifier, status, "createdBy", "createdAt", "updatedBy", "updatedAt") FROM stdin;
    public          postgres    false    211   pv       �          0    33874    MstUserDetail 
   TABLE DATA           t   COPY public."MstUserDetail" ("userId", "machineId", "createdBy", "createdAt", "updatedBy", "updatedAt") FROM stdin;
    public          postgres    false    212   �v       �          0    42059    MstUserDetailLog 
   TABLE DATA           {   COPY public."MstUserDetailLog" ("userId", "machineId", "createdBy", "createdAt", "updatedBy", "updatedAt", id) FROM stdin;
    public          postgres    false    228   �v       �          0    42094 
   MstUserLog 
   TABLE DATA           �   COPY public."MstUserLog" (id, "roleId", name, email, password, "userId", status, "createdBy", "createdAt", "updatedBy", "updatedAt") FROM stdin;
    public          postgres    false    235   �v       �          0    33888    TrxActualRelease 
   TABLE DATA              COPY public."TrxActualRelease" (id, "machineId", date, amount, "createdAt", "updatedAt", "createdBy", "updatedBy") FROM stdin;
    public          postgres    false    214   �v       �          0    42074    TrxActualReleaseLog 
   TABLE DATA           �   COPY public."TrxActualReleaseLog" (id, "machineId", date, amount, "createdAt", "updatedAt", "createdBy", "updatedBy", "troubleId") FROM stdin;
    public          postgres    false    231   w       �          0    33916    TrxDefaultTarget 
   TABLE DATA           y   COPY public."TrxDefaultTarget" (id, "machineId", target, "createdAt", "updatedAt", "createdBy", "updatedBy") FROM stdin;
    public          postgres    false    218   w       �          0    42064    TrxDefaultTargetLog 
   TABLE DATA           �   COPY public."TrxDefaultTargetLog" (id, "machineId", target, "createdAt", "updatedAt", "createdBy", "updatedBy", "defaultTargetId") FROM stdin;
    public          postgres    false    229   ;w       �          0    33944    TrxManualCollection 
   TABLE DATA           �   COPY public."TrxManualCollection" (id, "machineId", "categoryId", value, shift, remark, "createdAt", "createdBy", "updatedAt", "updatedBy") FROM stdin;
    public          postgres    false    222   Xw       �          0    42069    TrxManualCollectionLog 
   TABLE DATA           �   COPY public."TrxManualCollectionLog" (id, "defectReworkLossesId", "categoryId", value, shift, remark, "createdAt", "createdBy", "updatedAt", "updatedBy") FROM stdin;
    public          postgres    false    230   uw       �          0    33930    TrxOEETarget 
   TABLE DATA           u   COPY public."TrxOEETarget" (id, "machineId", target, "createdAt", "updatedAt", "createdBy", "updatedBy") FROM stdin;
    public          postgres    false    220   �w       �          0    42089    TrxOEETargetLog 
   TABLE DATA           �   COPY public."TrxOEETargetLog" (id, "machineId", target, "createdAt", "updatedAt", "createdBy", "updatedBy", "OEETargetId") FROM stdin;
    public          postgres    false    234   �w       �          0    33923    TrxProductionTarget 
   TABLE DATA           �   COPY public."TrxProductionTarget" (id, "machineId", target, "activeTarget", "createdAt", "updatedAt", "createdBy", "updatedBy") FROM stdin;
    public          postgres    false    219   �w       �          0    42054    TrxProductionTargetLog 
   TABLE DATA           �   COPY public."TrxProductionTargetLog" (id, "productionTargetId", target, "activeTarget", "createdAt", "updatedAt", "createdBy", "updatedBy") FROM stdin;
    public          postgres    false    227   �w       �          0    33881 
   TrxRelease 
   TABLE DATA           a   COPY public."TrxRelease" (id, "machineId", amount, "time", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    213   x       �          0    33937    TrxReportOEE 
   TABLE DATA           �   COPY public."TrxReportOEE" (id, "machineId", "OEE", "AV", "PE", "QR", date, "createdAt", "updatedAt", "createdBy", "updatedBy") FROM stdin;
    public          postgres    false    221   #x       �          0    42044    TrxReportOEELog 
   TABLE DATA           �   COPY public."TrxReportOEELog" (id, "machineId", "OEE", "AV", "PE", "QR", date, "createdAt", "updatedAt", "createdBy", "updatedBy", "reportOEEId") FROM stdin;
    public          postgres    false    225   @x       �          0    33952 
   TrxStartup 
   TABLE DATA           �   COPY public."TrxStartup" (id, "machineId", "startTime", "endTime", "createdAt", "createdBy", "updatedAt", "updatedBy") FROM stdin;
    public          postgres    false    223   ]x       �          0    33959    TrxStatusMachine 
   TABLE DATA           y   COPY public."TrxStatusMachine" (id, "machineId", status, "createdAt", "createdBy", "updatedAt", "updatedBy") FROM stdin;
    public          postgres    false    224   zx       �          0    33909 
   TrxTrouble 
   TABLE DATA           �   COPY public."TrxTrouble" (id, "machineId", "categoryId", "startTime", "endTime", remark, status, "createdAt", "createdBy") FROM stdin;
    public          postgres    false    217   �x       �          0    42079    TrxTroubleLog 
   TABLE DATA           �   COPY public."TrxTroubleLog" (id, "machineId", "categoryId", "time", remark, status, "createdAt", "createdBy", "troubleId") FROM stdin;
    public          postgres    false    232   �x       �           2606    33901 (   MstCategoryParent MstCategoryParent_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."MstCategoryParent"
    ADD CONSTRAINT "MstCategoryParent_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."MstCategoryParent" DROP CONSTRAINT "MstCategoryParent_pkey";
       public            postgres    false    215            �           2606    33908    MstCategory MstCategory_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."MstCategory"
    ADD CONSTRAINT "MstCategory_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."MstCategory" DROP CONSTRAINT "MstCategory_pkey";
       public            postgres    false    216            �           2606    33859    MstMachine MstMachine_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."MstMachine"
    ADD CONSTRAINT "MstMachine_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."MstMachine" DROP CONSTRAINT "MstMachine_pkey";
       public            postgres    false    209            �           2606    42114 .   MstReportTemplateLog MstReportTemplateLog_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public."MstReportTemplateLog"
    ADD CONSTRAINT "MstReportTemplateLog_pkey" PRIMARY KEY (id);
 \   ALTER TABLE ONLY public."MstReportTemplateLog" DROP CONSTRAINT "MstReportTemplateLog_pkey";
       public            postgres    false    236            �           2606    33866    MstRole MstRole_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."MstRole"
    ADD CONSTRAINT "MstRole_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."MstRole" DROP CONSTRAINT "MstRole_pkey";
       public            postgres    false    210            �           2606    42100 &   MstUserDetailLog MstUserDetailLog_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."MstUserDetailLog"
    ADD CONSTRAINT "MstUserDetailLog_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."MstUserDetailLog" DROP CONSTRAINT "MstUserDetailLog_pkey";
       public            postgres    false    228            �           2606    33880     MstUserDetail MstUserDetail_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."MstUserDetail"
    ADD CONSTRAINT "MstUserDetail_pkey" PRIMARY KEY ("userId");
 N   ALTER TABLE ONLY public."MstUserDetail" DROP CONSTRAINT "MstUserDetail_pkey";
       public            postgres    false    212            �           2606    42107    MstUserLog MstUserLog_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."MstUserLog"
    ADD CONSTRAINT "MstUserLog_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."MstUserLog" DROP CONSTRAINT "MstUserLog_pkey";
       public            postgres    false    235            �           2606    33873    MstUser MstUser_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."MstUser"
    ADD CONSTRAINT "MstUser_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."MstUser" DROP CONSTRAINT "MstUser_pkey";
       public            postgres    false    211            �           2606    33894 &   TrxActualRelease TrxActualRelease_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."TrxActualRelease"
    ADD CONSTRAINT "TrxActualRelease_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."TrxActualRelease" DROP CONSTRAINT "TrxActualRelease_pkey";
       public            postgres    false    214            �           2606    33922 &   TrxDefaultTarget TrxDefaultTarget_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."TrxDefaultTarget"
    ADD CONSTRAINT "TrxDefaultTarget_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."TrxDefaultTarget" DROP CONSTRAINT "TrxDefaultTarget_pkey";
       public            postgres    false    218            �           2606    33950 ,   TrxManualCollection TrxManualCollection_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."TrxManualCollection"
    ADD CONSTRAINT "TrxManualCollection_pkey" PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public."TrxManualCollection" DROP CONSTRAINT "TrxManualCollection_pkey";
       public            postgres    false    222            �           2606    33936    TrxOEETarget TrxOEETarget_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."TrxOEETarget"
    ADD CONSTRAINT "TrxOEETarget_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."TrxOEETarget" DROP CONSTRAINT "TrxOEETarget_pkey";
       public            postgres    false    220            �           2606    33929 ,   TrxProductionTarget TrxProductionTarget_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."TrxProductionTarget"
    ADD CONSTRAINT "TrxProductionTarget_pkey" PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public."TrxProductionTarget" DROP CONSTRAINT "TrxProductionTarget_pkey";
       public            postgres    false    219            �           2606    33887    TrxRelease TrxRelease_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."TrxRelease"
    ADD CONSTRAINT "TrxRelease_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."TrxRelease" DROP CONSTRAINT "TrxRelease_pkey";
       public            postgres    false    213            �           2606    33943    TrxReportOEE TrxReportOEE_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."TrxReportOEE"
    ADD CONSTRAINT "TrxReportOEE_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."TrxReportOEE" DROP CONSTRAINT "TrxReportOEE_pkey";
       public            postgres    false    221            �           2606    33958    TrxStartup TrxStartup_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."TrxStartup"
    ADD CONSTRAINT "TrxStartup_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."TrxStartup" DROP CONSTRAINT "TrxStartup_pkey";
       public            postgres    false    223            �           2606    33965 &   TrxStatusMachine TrxStatusMachine_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."TrxStatusMachine"
    ADD CONSTRAINT "TrxStatusMachine_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."TrxStatusMachine" DROP CONSTRAINT "TrxStatusMachine_pkey";
       public            postgres    false    224            �           2606    33915    TrxTrouble TrxTrouble_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."TrxTrouble"
    ADD CONSTRAINT "TrxTrouble_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."TrxTrouble" DROP CONSTRAINT "TrxTrouble_pkey";
       public            postgres    false    217            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �            x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     
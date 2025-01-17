USE [QL_PM_CPMS]
GO
/****** Object:  UserDefinedFunction [dbo].[Func_Get_Select_Count_Script]    Script Date: 11/06/2024 08:46:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
create function [dbo].[Func_Get_Select_Count_Script]
--tra ve lenh sql co su phan trang
(
	@FromClause nvarchar(4000), -- table
	@PrimaryKey nvarchar(100), -- khoa chinh
	@WhereClause nvarchar(4000) -- dieu kien loc
)
	returns nvarchar(max)
as
begin
	return 
		'select count(' + @PrimaryKey + ') as Total '  -- danh sach truong
		+ ' from ' + @FromClause -- from table
		+ (case when isnull(@WhereClause, '') = '' then '' else ' where ' + @WhereClause end) -- dieu kien where
end
GO
/****** Object:  UserDefinedFunction [dbo].[Func_Get_Select_Paging_Script]    Script Date: 11/06/2024 08:46:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
create function [dbo].[Func_Get_Select_Paging_Script]
--tra ve lenh sql co su phan trang
(
	@FromClause nvarchar(4000),
	@OrderBy nvarchar(250),
	@PageIndex int, -- trang thu may, tinh tu 1
	@PageSize int, -- so luong ban ghi trong 1 trang
	@Fields nvarchar(1024), -- danh sach truong` tra ve
	@WhereClause nvarchar(4000) -- dieu kien loc
)
	returns nvarchar(max)
as
begin
	return 
		'select ' + @Fields  -- danh sach truong
		+ ' from ' + @FromClause -- from table
		+ (case when isnull(@WhereClause, '') = '' then '' else ' where ' + @WhereClause end) -- dieu kien where
		+ ' order by ' + @OrderBy --sap xep
		+ ' offset ' + convert(varchar(10), (@PageIndex - 1) * @PageSize) + ' rows fetch next ' + convert(varchar(10), @PageSize) + '  rows only' --phan trang
end
GO
/****** Object:  UserDefinedFunction [dbo].[Func_Get_String_By_Index]    Script Date: 11/06/2024 08:46:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
create function [dbo].[Func_Get_String_By_Index]
--Tra ve phan tu strong 1 chuoi string bi split
(
	@String nvarchar(4000),
	@Separator char(1),
	@Index int --tinh tu 1
)
returns nvarchar(200)
as
begin
	declare @t table (id int identity(1,1) not null, string nvarchar(200))
	insert into @t(string)
		select [value] from string_split(@String, @Separator)
	return (select top 1 string from @t where id = @Index)
end
GO
/****** Object:  Table [dbo].[epirbCP]    Script Date: 11/06/2024 08:46:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[epirbCP](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[id_Epirb] [int] NOT NULL,
	[name_Owner] [nvarchar](50) NOT NULL,
	[email_Owner] [nvarchar](50) NOT NULL,
	[officePhone_Owner] [int] NOT NULL,
	[name_Veseel] [nvarchar](50) NOT NULL,
	[callSign_Veseel] [nvarchar](50) NOT NULL,
	[mmsiNumber_Veseel] [nvarchar](50) NOT NULL,
	[type_Veseel] [nvarchar](50) NOT NULL,
	[radioEquipment_Veseel] [nvarchar](50) NOT NULL,
	[imoNumber_Veseel] [nvarchar](50) NOT NULL,
	[crewPassengers_Veseel] [nvarchar](50) NOT NULL,
	[meta_Code] [varchar](20) NOT NULL,
	[jsonMeta] [ntext] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_Epirb] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MCC_PHANHOI]    Script Date: 11/06/2024 08:46:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MCC_PHANHOI](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdPhao] [int] NOT NULL,
	[NoiDung] [nvarchar](500) NULL,
	[TrangThai] [int] NOT NULL,
	[NguoiCN] [varchar](50) NOT NULL,
	[NgayCN] [datetime] NOT NULL,
 CONSTRAINT [PK_MCC_TAIKHOANKH] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MCC_PHAO]    Script Date: 11/06/2024 08:46:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MCC_PHAO](
	[IdPhao] [int] IDENTITY(1,1) NOT NULL,
	[TypePhao] [char](1) NOT NULL,
	[NgayKhai] [datetime] NOT NULL,
	[XuLy] [char](1) NOT NULL,
	[MaKH] [varchar](10) NULL,
	[TaiKhoanKH] [varchar](100) NULL,
	[NguoiCN] [varchar](50) NULL,
	[NgayCN] [datetime] NULL,
	[IdChar] [varchar](15) NULL,
	[NXB] [nvarchar](50) NULL,
	[Model] [varchar](50) NULL,
	[Serial] [varchar](50) NULL,
	[Category] [char](1) NULL,
	[ThietBiPhuTro] [char](1) NULL,
	[ThongTinKhac] [nvarchar](200) NULL,
	[DuLieuCungCap] [char](1) NULL,
	[O_Name] [nvarchar](50) NULL,
	[O_Name_International] [nvarchar](50) NULL,
	[O_Address] [nvarchar](200) NULL,
	[O_City] [nvarchar](50) NULL,
	[O_PostalCode] [varchar](20) NULL,
	[O_Country] [nvarchar](50) NULL,
	[O_WorkPhone] [varchar](50) NULL,
	[O_HomePhone] [varchar](20) NULL,
	[O_Fax] [varchar](50) NULL,
	[O_Email] [varchar](50) NULL,
	[E_Name] [nvarchar](50) NULL,
	[E_WorkPhone] [varchar](100) NULL,
	[E_HomePhone] [varchar](50) NULL,
	[E_Mobile] [varchar](50) NULL,
	[E_Fax] [varchar](100) NULL,
	[E_Email] [varchar](50) NULL,
	[_MucDich] [char](1) NULL,
	[_NhaSanXuat] [nvarchar](200) NULL,
	[_NhaKhaiThac] [nvarchar](200) NULL,
	[_Model_ELT] [varchar](20) NULL,
	[_HoHieu] [varchar](10) NULL,
	[_ChieuDai] [varchar](20) NULL,
	[_INM] [varchar](20) NULL,
	[_IMO] [varchar](20) NULL,
	[_TrongTai] [varchar](20) NULL,
	[_Name] [nvarchar](200) NULL,
	[_SoDangKy] [varchar](50) NULL,
	[_Color] [nvarchar](30) NULL,
	[_Type] [int] NULL,
	[_SLNguoi] [int] NULL,
	[_ThietBiVoTuyen] [varchar](30) NULL,
	[_ThongTinKhac] [nvarchar](200) NULL,
 CONSTRAINT [PK_MCC_PHAO] PRIMARY KEY CLUSTERED 
(
	[IdPhao] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MCC_PHAO_HS]    Script Date: 11/06/2024 08:46:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MCC_PHAO_HS](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdPhao] [int] NOT NULL,
	[TypePhao] [char](1) NOT NULL,
	[NgayKhai] [datetime] NOT NULL,
	[XuLy] [char](1) NOT NULL,
	[MaKH] [varchar](10) NULL,
	[TaiKhoanKH] [varchar](100) NULL,
	[NguoiCN] [varchar](50) NULL,
	[NgayCN] [datetime] NULL,
	[IdChar] [varchar](15) NULL,
	[NXB] [nvarchar](50) NULL,
	[Model] [varchar](50) NULL,
	[Serial] [varchar](50) NULL,
	[Category] [char](1) NULL,
	[ThietBiPhuTro] [char](1) NULL,
	[ThongTinKhac] [nvarchar](200) NULL,
	[DuLieuCungCap] [char](1) NULL,
	[O_Name] [nvarchar](50) NULL,
	[O_Name_International] [nvarchar](50) NULL,
	[O_Address] [nvarchar](200) NULL,
	[O_City] [nvarchar](50) NULL,
	[O_PostalCode] [varchar](20) NULL,
	[O_Country] [nvarchar](50) NULL,
	[O_WorkPhone] [varchar](50) NULL,
	[O_HomePhone] [varchar](20) NULL,
	[O_Fax] [varchar](50) NULL,
	[O_Email] [varchar](50) NULL,
	[E_Name] [nvarchar](50) NULL,
	[E_WorkPhone] [varchar](100) NULL,
	[E_HomePhone] [varchar](50) NULL,
	[E_Mobile] [varchar](50) NULL,
	[E_Fax] [varchar](100) NULL,
	[E_Email] [varchar](50) NULL,
	[_MucDich] [char](1) NULL,
	[_NhaSanXuat] [nvarchar](200) NULL,
	[_NhaKhaiThac] [nvarchar](200) NULL,
	[_Model_ELT] [varchar](20) NULL,
	[_HoHieu] [varchar](10) NULL,
	[_ChieuDai] [varchar](20) NULL,
	[_INM] [varchar](20) NULL,
	[_IMO] [varchar](20) NULL,
	[_TrongTai] [varchar](20) NULL,
	[_Name] [nvarchar](200) NULL,
	[_SoDangKy] [varchar](50) NULL,
	[_Color] [nvarchar](30) NULL,
	[_Type] [int] NULL,
	[_SLNguoi] [int] NULL,
	[_ThietBiVoTuyen] [varchar](30) NULL,
	[_ThongTinKhac] [nvarchar](200) NULL,
 CONSTRAINT [PK_MCC_PHAO_HS] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MCC_TAIKHOANKHPHAO]    Script Date: 11/06/2024 08:46:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MCC_TAIKHOANKHPHAO](
	[Email] [varchar](100) NOT NULL,
	[NguoiCN] [varchar](50) NOT NULL,
	[NgayCN] [datetime] NOT NULL,
 CONSTRAINT [PK_MCC_TAIKHOANKHPHAO] PRIMARY KEY CLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[MCC_PHANHOI] ADD  DEFAULT ((0)) FOR [TrangThai]
GO
/****** Object:  StoredProcedure [dbo].[Proc_QL_PM_CPMS_Delete]    Script Date: 11/06/2024 08:46:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[Proc_QL_PM_CPMS_Delete] 
	--thuc hien update QL_PhanMem
@ThamSo nvarchar(max),
@UserRequest varchar(40)
AS
BEGIN
		declare @now datetime = getdate()
	declare @IdPhao int ,
@TypePhao char(1) , @NgayKhai datetime , @XuLy char(1) , @MaKH varchar(10) , @TaiKhoanKH varchar(100) , @NguoiCN varchar(50) , @NgayCN datetime , @IdChar varchar(15) ,@NXB nvarchar(50) ,@Model varchar(50) ,@Serial varchar(50) ,@Category char(1) ,
@ThietBiPhuTro char(1) ,
@ThongTinKhac nvarchar(200) ,
@DuLieuCungCap char(1) ,
@O_Name nvarchar(50) ,
@O_Name_International nvarchar(50) ,
@O_Address nvarchar(200) ,
@O_City nvarchar(50) ,
@O_PostalCode varchar(20) ,
@O_Country nvarchar(50) ,
@O_WorkPhone varchar(50) ,
@O_HomePhone varchar(20) ,
@O_Fax varchar(50) ,
@O_Email varchar(50) ,
@E_Name nvarchar(50) ,
@E_WorkPhone varchar(100) ,
@E_HomePhone varchar(50) ,
@E_Mobile varchar(50) ,
@E_Fax varchar(100) ,
@E_Email varchar(50) ,
@_MucDich char(1) ,
@_NhaSanXuat nvarchar(200) ,
@_NhaKhaiThac nvarchar(200) ,
@_Model_ELT varchar(20) ,
@_HoHieu varchar(10) ,
@_ChieuDai varchar(20) ,
@_INM varchar(20) ,
@_IMO varchar(20) ,
@_TrongTai varchar(20) ,
@_Name nvarchar(200) ,
@_SoDangKy varchar(50) ,
@_Color nvarchar(30) ,
@_Type int ,
@_SLNguoi int ,
@_ThietBiVoTuyen varchar(30) ,
@_ThongTinKhac nvarchar(200) 
select
	@IdPhao = case when [key] = 'IdPhao' then [value] else @IdPhao end,
	@TypePhao = case when [key] = 'TypePhao' then [value] else @TypePhao end,
	@NgayKhai = case when [key] = 'NgayKhai' then [value] else @NgayKhai end,
	@XuLy = case when [key] = 'XuLy' then [value] else @XuLy end,
	@MaKH = case when [key] = 'MaKH' then [value] else @MaKH end,
	@TaiKhoanKH = case when [key] = 'TaiKhoanKH' then [value] else @TaiKhoanKH end ,
	@NguoiCN = case when [key] = 'NguoiCN' then [value] else @NguoiCN end,
	@NgayCN = case when [key] = 'NgayCN' then [value] else @NgayCN end ,
	@IdChar = case when [key] = 'IdChar' then [value] else @IdChar end ,
	@NXB = case when [key] = 'NXB' then [value] else @NXB end ,
	@Model = case when [key] = 'Model' then [value] else @Model end,
	@Serial = case when [key] = 'Serial' then [value] else @Serial end ,
	@Category = case when [key] = 'Category' then [value] else @Category end ,
	@ThietBiPhuTro = case when [key] = 'ThietBiPhuTro' then [value] else @ThietBiPhuTro end ,
	@ThongTinKhac = case when [key] = 'ThongTinKhac' then [value] else @ThongTinKhac end ,
	@DuLieuCungCap = case when [key] = 'DuLieuCungCap' then [value] else @DuLieuCungCap end ,
	@O_Name = case when [key] = 'O_Name' then [value] else @O_Name end ,
	@O_Name_International = case when [key] = 'O_Name_International' then [value] else @O_Name_International end ,
	@O_Address = case when [key] = 'O_Address' then [value] else @O_Address end ,
	@O_City = case when [key] = 'O_City' then [value] else @O_City end ,
	@O_PostalCode = case when [key] = 'O_PostalCode' then [value] else @O_PostalCode end ,
	@O_Country = case when [key] = 'O_Country' then [value] else @O_Country end ,
	@O_WorkPhone = case when [key] = 'O_WorkPhone' then [value] else @O_WorkPhone end ,
	@O_HomePhone = case when [key] = 'O_HomePhone' then [value] else @O_HomePhone end ,
	@O_Fax = case when [key] = 'O_Fax' then [value] else @O_Fax end ,
	@O_Email = case when [key] = 'O_Email' then [value] else @O_Email end,

	@E_Name = case when [key] = 'E_Name' then [value] else @E_Name end ,
	@E_WorkPhone = case when [key] = 'E_WorkPhone' then [value] else @E_WorkPhone end ,
	@E_HomePhone = case when [key] = 'E_HomePhone' then [value] else @E_HomePhone end ,
	@E_Mobile = case when [key] = 'E_Mobile' then [value] else @E_Mobile end ,
	@E_Fax = case when [key] = 'E_Fax' then [value] else @E_Fax end ,
	@E_Email = case when [key] = 'E_Email' then [value] else @E_Email end ,

	@_MucDich = case when [key] = '_MucDich' then [value] else @_MucDich end ,
	@_NhaSanXuat = case when [key] = '_NhaSanXuat' then [value] else @_NhaSanXuat end,
	@_NhaKhaiThac = case when [key] = '_NhaKhaiThac' then [value] else @_NhaKhaiThac end ,
	@_Model_ELT = case when [key] = '_Model_ELT' then [value] else @_Model_ELT end ,
	@_HoHieu = case when [key] = '_HoHieu' then [value] else @_HoHieu end ,
	@_ChieuDai = case when [key] = '_ChieuDai' then [value] else @_ChieuDai end ,
	@_INM = case when [key] = '_INM' then [value] else @_INM end ,
	@_IMO = case when [key] = '_IMO' then [value] else @_IMO end ,
	@_TrongTai = case when [key] = '_TrongTai' then [value] else @_TrongTai end ,
	@_Name = case when [key] = '_Name' then [value] else @_Name end ,
	@_SoDangKy = case when [key] = '_SoDangKy' then [value] else @_SoDangKy end ,
	@_Color = case when [key] = '_Color' then [value] else @_Color end ,
	@_Type = case when [key] = '_Type' then [value] else @_Type end ,
	@_SLNguoi = case when [key] = '_SLNguoi' then [value] else @_SLNguoi end ,
	@_ThietBiVoTuyen = case when [key] = '_ThietBiVoTuyen' then [value] else @_ThietBiVoTuyen end ,
	@_ThongTinKhac = case when [key] = '_ThongTinKhac' then [value] else @_ThongTinKhac end 
from OPENJSON(@ThamSo, 'lax $')
set @NguoiCN = @UserRequest
set @NgayCN = @now

-- lenh insert
-- audit old data
-- audit delete
		insert into MCC_PHAO_HS(IdPhao, TypePhao , NgayKhai ,XuLy , MaKH ,TaiKhoanKH ,NguoiCN ,NgayCN ,IdChar ,NXB ,Model ,Serial ,Category ,ThietBiPhuTro ,ThongTinKhac ,DuLieuCungCap ,O_Name ,O_Name_International ,O_Address ,O_City ,O_PostalCode ,O_Country ,O_WorkPhone ,O_HomePhone ,O_Fax ,O_Email ,E_Name ,E_WorkPhone ,E_HomePhone ,E_Mobile ,E_Fax ,E_Email ,_MucDich ,_NhaSanXuat ,_NhaKhaiThac ,_Model_ELT ,_HoHieu ,_ChieuDai ,_INM ,_IMO ,_TrongTai ,_Name ,_SoDangKy ,_Color ,_Type ,_SLNguoi ,_ThietBiVoTuyen ,_ThongTinKhac)
		select IdPhao, TypePhao , NgayKhai ,XuLy , MaKH ,TaiKhoanKH ,NguoiCN ,NgayCN ,IdChar ,NXB ,Model ,Serial ,Category ,ThietBiPhuTro ,ThongTinKhac ,DuLieuCungCap ,O_Name ,O_Name_International ,O_Address ,O_City ,O_PostalCode ,O_Country ,O_WorkPhone ,O_HomePhone ,O_Fax ,O_Email ,E_Name ,E_WorkPhone ,E_HomePhone ,E_Mobile ,E_Fax ,E_Email ,_MucDich ,_NhaSanXuat ,_NhaKhaiThac ,_Model_ELT ,_HoHieu ,_ChieuDai ,_INM ,_IMO ,_TrongTai ,_Name ,_SoDangKy ,_Color ,_Type ,_SLNguoi ,_ThietBiVoTuyen ,_ThongTinKhac
			from MCC_PHAO
				where IdPhao = @IdPhao
	-- lenh delete
	delete MCC_PHAO 
		where IdPhao = @IdPhao
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_QL_PM_CPMS_Search]    Script Date: 11/06/2024 08:46:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Proc_QL_PM_CPMS_Search]
@ThamSo nvarchar(max),
@UserRequest nvarchar(40)
AS
BEGIN
	declare @PageIndex int = 1, @PageSize int = 1, @SortBy int = 0, @Ascending varchar(5), @Debug bit = 0
	declare @OrderList nvarchar(500) = 'a.IdPhao ;a.TypePhao ; a.NgayKhai ;a.XuLy ; a.MaKH ;a.TaiKhoanKH ;a.NguoiCN ;a.NgayCN ;a.IdChar ;a.NXB ;a.Model ;a.Serial ;a.Category ;a.ThietBiPhuTro ;a.ThongTinKhac ;a.DuLieuCungCap ;a.O_Name ;a.O_Name_International ;a.O_Address ;a.O_City ;a.O_PostalCode ;a.O_Country ;a.O_WorkPhone ;a.O_HomePhone ;a.O_Fax ;a.O_Email ;a.E_Name ;a.E_WorkPhone ;a.E_HomePhone ;a.E_Mobile ;a.E_Fax ;a.E_Email ;a._MucDich ;a._NhaSanXuat ;a._NhaKhaiThac ;a._Model_ELT ;a._HoHieu ;a._ChieuDai ;a._INM ;a._IMO ;a._TrongTai ;a._Name ;a._SoDangKy ;a._Color ;a._Type ;a._SLNguoi ;a._ThietBiVoTuyen ;a._ThongTinKhac'

	-- ca tieu chi tim kiem
	declare @IdChar varchar(15), @O_Name nvarchar(50), @NgayCN datetime, @XuLy char(1)
	declare @declare nvarchar(4000) = '@IdChar varchar(15), @O_Name nvarchar(50), @NgayCN datetime, @XuLy char(1)'
	select
	@PageIndex = case when [key] = 'PageIndex' then [value] else @PageIndex end, -- trang thu may tinh tu 1
	@PageSize = case when [key] = 'PageSize' then [value] else @PageSize end, -- so ban ghi 1 trang
	@SortBy = case when [key] = 'SortBy' then [value] else @SortBy end, -- sx theo cot
	@Ascending = case when [key] = 'Ascending' then [value] else @Ascending end, -- chieu sx
	@Debug = case when [key] = 'Debug' then [value] else @Debug end, -- co debug ko
	--cac tieu chi tim kiem
	@IdChar = case when [key] = 'IdChar' then [value] else @IdChar end,
	@O_Name = case when [key] = 'O_Name' then [value] else @O_Name end,
	@NgayCN = case when [key] = 'NgayCN' then [value] else @NgayCN end,
	@XuLy = case when [key] = 'XuLy' then [value] else @XuLy end
	from OPENJSON(@ThamSo, N'lax $')
	--sx
	set @O_Name = '%' + @O_Name + '%'
	set @SortBy = 1
	-- xac dinh bieu thuc sap xep
	declare @SortByField nvarchar(200)
	select @SortByField = dbo.Func_Get_String_By_Index(@OrderList, ';', @SortBy + 1)
	if @SortByField is null
	raiserror(N' Không xác định được trường sắp xếp', 16, 1)
	set @SortByField = case when @SortByField like '%*%' then replace(@SortByField, '*', case when @Ascending = 'true' then ''else ' desc' end)
		else @SortByField + case when @Ascending = 'true' then '' else ' desc' end end
	-- tao dien kien where
	declare @where nvarchar(4000) = ''

set @where = @where + case when @IdChar is null then '' else case when @where <> '' then ' and ' else '' end + 'a.IdChar like @IdChar' end
set @where = @where + case when @O_Name is null then '' else case when @where <> '' then ' and ' else '' end + 'a.O_Name like @O_Name' end
set @where = @where + case when @NgayCN is null then '' else case when @where <> '' then ' and ' else '' end + 'a.NgayCN = @NgayCN' end
set @where = @where + case when @XuLy is null then '' else case when @where <> '' then ' and ' else '' end + 'a.XuLy = @XuLy' end
	--tao lenh select
	declare @fromTables nvarchar(4000)= 'MCC_PHAO a'
	declare @sql nvarchar(4000) = dbo.Func_Get_Select_Paging_Script(@fromTables, @SortByField, @PageIndex, @PageSize, 'a.*', @where)
	declare @sql_count nvarchar(4000) = dbo.Func_Get_Select_Count_Script(@fromTables, 'a.IdChar', @where)
	print @sql
	--ten danh sach du lieu tra ve
	select 'DataCount' as DataName
	union
	select 'DataList' as DataName
	begin try
	--chay lenh count tra ve tong so ban ghi
		exec sp_executesql @sql_count, @declare, @IdChar = @IdChar, @O_Name = @O_Name, @NgayCN = @NgayCN, @XuLy = @XuLy
	-- chay lenh tra ve danh sach ban ghi
		exec sp_executesql @sql, @declare, @IdChar = @IdChar, @O_Name = @O_Name, @NgayCN = @NgayCN, @XuLy = @XuLy
	
		if @Debug = 1
		begin 
			select @IdChar as IdChar, @O_Name as O_Name
			select @sql as ScriptSQL
		end
	end try
	begin catch
	set @sql = ERROR_MESSAGE() + char(10) + char(13) + @sql
		if @Debug = 1
			throw 60000, @sql, 1
		else
			throw
	end catch
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_QL_PM_CPMS_Update]    Script Date: 11/06/2024 08:46:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[Proc_QL_PM_CPMS_Update]
	@ThamSo nvarchar(max),
	@UserRequest varchar(40)
AS
BEGIN
	declare @now datetime = getdate()
	declare @IdPhao int ,
@TypePhao char(1) , @NgayKhai datetime , @XuLy char(1) , @MaKH varchar(10) , @TaiKhoanKH varchar(100) , @NguoiCN varchar(50) , @NgayCN datetime , @IdChar varchar(15) ,@NXB nvarchar(50) ,@Model varchar(50) ,@Serial varchar(50) ,@Category char(1) ,
@ThietBiPhuTro char(1) ,
@ThongTinKhac nvarchar(200) ,
@DuLieuCungCap char(1) ,
@O_Name nvarchar(50) ,
@O_Name_International nvarchar(50) ,
@O_Address nvarchar(200) ,
@O_City nvarchar(50) ,
@O_PostalCode varchar(20) ,
@O_Country nvarchar(50) ,
@O_WorkPhone varchar(50) ,
@O_HomePhone varchar(20) ,
@O_Fax varchar(50) ,
@O_Email varchar(50) ,
@E_Name nvarchar(50) ,
@E_WorkPhone varchar(100) ,
@E_HomePhone varchar(50) ,
@E_Mobile varchar(50) ,
@E_Fax varchar(100) ,
@E_Email varchar(50) ,
@_MucDich char(1) ,
@_NhaSanXuat nvarchar(200) ,
@_NhaKhaiThac nvarchar(200) ,
@_Model_ELT varchar(20) ,
@_HoHieu varchar(10) ,
@_ChieuDai varchar(20) ,
@_INM varchar(20) ,
@_IMO varchar(20) ,
@_TrongTai varchar(20) ,
@_Name nvarchar(200) ,
@_SoDangKy varchar(50) ,
@_Color nvarchar(30) ,
@_Type int ,
@_SLNguoi int ,
@_ThietBiVoTuyen varchar(30) ,
@_ThongTinKhac nvarchar(200) 
select
	@IdPhao = case when [key] = 'IdPhao' then [value] else @IdPhao end,
	@TypePhao = case when [key] = 'TypePhao' then [value] else @TypePhao end,
	@NgayKhai = case when [key] = 'NgayKhai' then [value] else @NgayKhai end,
	@XuLy = case when [key] = 'XuLy' then [value] else @XuLy end,
	@MaKH = case when [key] = 'MaKH' then [value] else @MaKH end,
	@TaiKhoanKH = case when [key] = 'TaiKhoanKH' then [value] else @TaiKhoanKH end ,
	@NguoiCN = case when [key] = 'NguoiCN' then [value] else @NguoiCN end,
	@NgayCN = case when [key] = 'NgayCN' then [value] else @NgayCN end ,
	@IdChar = case when [key] = 'IdChar' then [value] else @IdChar end ,
	@NXB = case when [key] = 'NXB' then [value] else @NXB end ,
	@Model = case when [key] = 'Model' then [value] else @Model end,
	@Serial = case when [key] = 'Serial' then [value] else @Serial end ,
	@Category = case when [key] = 'Category' then [value] else @Category end ,
	@ThietBiPhuTro = case when [key] = 'ThietBiPhuTro' then [value] else @ThietBiPhuTro end ,
	@ThongTinKhac = case when [key] = 'ThongTinKhac' then [value] else @ThongTinKhac end ,
	@DuLieuCungCap = case when [key] = 'DuLieuCungCap' then [value] else @DuLieuCungCap end ,
	@O_Name = case when [key] = 'O_Name' then [value] else @O_Name end ,
	@O_Name_International = case when [key] = 'O_Name_International' then [value] else @O_Name_International end ,
	@O_Address = case when [key] = 'O_Address' then [value] else @O_Address end ,
	@O_City = case when [key] = 'O_City' then [value] else @O_City end ,
	@O_PostalCode = case when [key] = 'O_PostalCode' then [value] else @O_PostalCode end ,
	@O_Country = case when [key] = 'O_Country' then [value] else @O_Country end ,
	@O_WorkPhone = case when [key] = 'O_WorkPhone' then [value] else @O_WorkPhone end ,
	@O_HomePhone = case when [key] = 'O_HomePhone' then [value] else @O_HomePhone end ,
	@O_Fax = case when [key] = 'O_Fax' then [value] else @O_Fax end ,
	@O_Email = case when [key] = 'O_Email' then [value] else @O_Email end,

	@E_Name = case when [key] = 'E_Name' then [value] else @E_Name end ,
	@E_WorkPhone = case when [key] = 'E_WorkPhone' then [value] else @E_WorkPhone end ,
	@E_HomePhone = case when [key] = 'E_HomePhone' then [value] else @E_HomePhone end ,
	@E_Mobile = case when [key] = 'E_Mobile' then [value] else @E_Mobile end ,
	@E_Fax = case when [key] = 'E_Fax' then [value] else @E_Fax end ,
	@E_Email = case when [key] = 'E_Email' then [value] else @E_Email end ,

	@_MucDich = case when [key] = '_MucDich' then [value] else @_MucDich end ,
	@_NhaSanXuat = case when [key] = '_NhaSanXuat' then [value] else @_NhaSanXuat end,
	@_NhaKhaiThac = case when [key] = '_NhaKhaiThac' then [value] else @_NhaKhaiThac end ,
	@_Model_ELT = case when [key] = '_Model_ELT' then [value] else @_Model_ELT end ,
	@_HoHieu = case when [key] = '_HoHieu' then [value] else @_HoHieu end ,
	@_ChieuDai = case when [key] = '_ChieuDai' then [value] else @_ChieuDai end ,
	@_INM = case when [key] = '_INM' then [value] else @_INM end ,
	@_IMO = case when [key] = '_IMO' then [value] else @_IMO end ,
	@_TrongTai = case when [key] = '_TrongTai' then [value] else @_TrongTai end ,
	@_Name = case when [key] = '_Name' then [value] else @_Name end ,
	@_SoDangKy = case when [key] = '_SoDangKy' then [value] else @_SoDangKy end ,
	@_Color = case when [key] = '_Color' then [value] else @_Color end ,
	@_Type = case when [key] = '_Type' then [value] else @_Type end ,
	@_SLNguoi = case when [key] = '_SLNguoi' then [value] else @_SLNguoi end ,
	@_ThietBiVoTuyen = case when [key] = '_ThietBiVoTuyen' then [value] else @_ThietBiVoTuyen end ,
	@_ThongTinKhac = case when [key] = '_ThongTinKhac' then [value] else @_ThongTinKhac end 
from OPENJSON(@ThamSo, 'lax $')
set @NguoiCN = @UserRequest
set @NgayCN = @now
if not exists (select IdPhao from MCC_PHAO where IdPhao = @IdPhao)
	begin
		insert into MCC_PHAO(TypePhao , NgayKhai ,XuLy , MaKH ,TaiKhoanKH ,NguoiCN ,NgayCN ,IdChar ,NXB ,Model ,Serial ,Category ,ThietBiPhuTro ,ThongTinKhac ,DuLieuCungCap ,O_Name ,O_Name_International ,O_Address ,O_City ,O_PostalCode ,O_Country ,O_WorkPhone ,O_HomePhone ,O_Fax ,O_Email ,E_Name ,E_WorkPhone ,E_HomePhone ,E_Mobile ,E_Fax ,E_Email ,_MucDich ,_NhaSanXuat ,_NhaKhaiThac ,_Model_ELT ,_HoHieu ,_ChieuDai ,_INM ,_IMO ,_TrongTai ,_Name ,_SoDangKy ,_Color ,_Type ,_SLNguoi ,_ThietBiVoTuyen ,_ThongTinKhac)
		values(@TypePhao , @NgayKhai ,@XuLy , @MaKH ,@TaiKhoanKH ,@NguoiCN ,@NgayCN ,@IdChar ,@NXB ,@Model ,@Serial ,@Category ,@ThietBiPhuTro ,@ThongTinKhac ,@DuLieuCungCap ,@O_Name ,@O_Name_International ,@O_Address ,@O_City ,@O_PostalCode ,@O_Country ,@O_WorkPhone ,@O_HomePhone ,@O_Fax ,@O_Email ,@E_Name ,@E_WorkPhone ,@E_HomePhone ,@E_Mobile ,@E_Fax ,@E_Email ,@_MucDich ,@_NhaSanXuat ,@_NhaKhaiThac ,@_Model_ELT ,@_HoHieu ,@_ChieuDai ,@_INM ,@_IMO ,@_TrongTai ,@_Name ,@_SoDangKy ,@_Color ,@_Type ,@_SLNguoi ,@_ThietBiVoTuyen ,@_ThongTinKhac)
		set @IdPhao = IDENT_CURRENT('MCC_PHAO')
	end
else begin
		--audit
		insert into MCC_PHAO_HS(TypePhao , NgayKhai ,XuLy , MaKH ,TaiKhoanKH ,NguoiCN ,NgayCN ,IdChar ,NXB ,Model ,Serial ,Category ,ThietBiPhuTro ,ThongTinKhac ,DuLieuCungCap ,O_Name ,O_Name_International ,O_Address ,O_City ,O_PostalCode ,O_Country ,O_WorkPhone ,O_HomePhone ,O_Fax ,O_Email ,E_Name ,E_WorkPhone ,E_HomePhone ,E_Mobile ,E_Fax ,E_Email ,_MucDich ,_NhaSanXuat ,_NhaKhaiThac ,_Model_ELT ,_HoHieu ,_ChieuDai ,_INM ,_IMO ,_TrongTai ,_Name ,_SoDangKy ,_Color ,_Type ,_SLNguoi ,_ThietBiVoTuyen ,_ThongTinKhac)
		select TypePhao , NgayKhai ,XuLy , MaKH ,TaiKhoanKH ,NguoiCN ,NgayCN ,IdChar ,NXB ,Model ,Serial ,Category ,ThietBiPhuTro ,ThongTinKhac ,DuLieuCungCap ,O_Name ,O_Name_International ,O_Address ,O_City ,O_PostalCode ,O_Country ,O_WorkPhone ,O_HomePhone ,O_Fax ,O_Email ,E_Name ,E_WorkPhone ,E_HomePhone ,E_Mobile ,E_Fax ,E_Email ,_MucDich ,_NhaSanXuat ,_NhaKhaiThac ,_Model_ELT ,_HoHieu ,_ChieuDai ,_INM ,_IMO ,_TrongTai ,_Name ,_SoDangKy ,_Color ,_Type ,_SLNguoi ,_ThietBiVoTuyen ,_ThongTinKhac
			from MCC_PHAO
				where IdPhao = @IdPhao
		-- lenh update
		update MCC_PHAO set 
			TypePhao = @TypePhao , 
NgayKhai = @NgayKhai ,
XuLy = @XuLy , 
MaKH = @MaKH ,
TaiKhoanKH = @TaiKhoanKH ,
NguoiCN = @NguoiCN ,
NgayCN = @NgayCN ,
IdChar = @IdChar ,
NXB = @NXB ,
Model = @Model ,
Serial = @Serial ,
Category = @Category ,
ThietBiPhuTro = @ThietBiPhuTro ,
ThongTinKhac = @ThongTinKhac ,
DuLieuCungCap = @DuLieuCungCap ,
O_Name = @O_Name ,
O_Name_International = @O_Name_International ,
O_Address = @O_Address ,
O_City = @O_City ,
O_PostalCode = @O_PostalCode ,
O_Country = @O_Country ,
O_WorkPhone = @O_WorkPhone ,
O_HomePhone = @O_HomePhone ,
O_Fax = @O_Fax ,
O_Email = @O_Email ,
E_Name = @E_Name ,
E_WorkPhone = @E_WorkPhone ,
E_HomePhone = @E_HomePhone ,
E_Mobile = @E_Mobile ,
E_Fax = @E_Fax ,
E_Email = @E_Email ,
_MucDich = @_MucDich ,
_NhaSanXuat = @_NhaSanXuat ,
_NhaKhaiThac = @_NhaKhaiThac ,
_Model_ELT = @_Model_ELT ,
_HoHieu = @_HoHieu ,
_ChieuDai = @_ChieuDai ,
_INM = @_INM ,
_IMO = @_IMO ,
_TrongTai = @_TrongTai ,
_Name = @_Name ,
_SoDangKy = @_SoDangKy ,
_Color = @_Color ,
_Type = @_Type ,
_SLNguoi = @_SLNguoi ,
_ThietBiVoTuyen = @_ThietBiVoTuyen ,
_ThongTinKhac = @_ThongTinKhac 
		where IdPhao = @IdPhao
	end
	--tra ve du lieu
	select 'MCC_PHAO' as DataName
	-- du lieu
	select * from MCC_PHAO where IdPhao = @IdPhao
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_Table_GetAll]    Script Date: 11/06/2024 08:46:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[Proc_Table_GetAll]
--tra ve du lieu theo ten table
@ThamSo varchar(max),
@UserRequest varchar(40)
as
begin
	declare @tables varchar(1024) = ''
	select @tables = case when [key] = 'TableNames' then [value] else @tables end
		from OPENJSON(@ThamSo, 'lax $')
	set @tables = @tables + ','
	--lay danh sach table
	declare @t table (DataName varchar(50))
	insert into @t(DataName)
		select [value] from string_split(@tables, ',')
			where [value] in (select TABLE_NAME from INFORMATION_SCHEMA.TABLES where TABLE_NAME like 'DM_%')
	--tra ve ten cac du lieu
	select * from @t
	--tra ve cac table
	declare @sql nvarchar(max) = ''
	select @sql = @sql
		+ case when @sql <> '' then ';' else '' end
		+ 'select * from ' + DataName
		from @t
	exec sp_executesql @sql
end

GO
/****** Object:  StoredProcedure [dbo].[Proc_XuLy_Request]    Script Date: 11/06/2024 08:46:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[Proc_XuLy_Request]
--thuc hien vai tro gateway xu ly request
@ThamSo nvarchar(max),
@UserRequest nvarchar(40)
as
begin
	begin try
		declare @Proc nvarchar(200) -- ten procedure se thuc hien xu ly du lieu
		declare @ThamSoFunction nvarchar(max)
		--lay thong tin tu trong tham so
		select 
			@Proc = case when [key] = 'Function' then [value] else @Proc end,
			@ThamSoFunction = case when [key] = 'ThamSo' then [value] else @ThamSoFunction end
			from OPENJSON(@THAMSO, N'lax $')
		-- kiem tra thong tin
		if @Proc is null
			raiserror(N'Chưa có thông tin Procedure', 16,1)
		if @Proc not like N'Proc_%'
			raiserror(N'Procedure chưa đúng định dạng', 16,1)
		--kiem tra su ton tai cua proc
		if not exists(select * from INFORMATION_SCHEMA.ROUTINES where ROUTINE_NAME = @Proc)
			raiserror(N'Procedure không tồn tại', 16,1)
		-- thuc hien
		declare @KhaiBao nvarchar(2048) = N'@ThamSoFunction nvarchar(max), @UserRequest nvarchar(40)'
		declare @stm nvarchar(1024) = @Proc + ' @ThamSoFunction, @UserRequest'
		exec sp_executesql @stm, @KhaiBao, @ThamSoFunction, @UserRequest
	end try
	begin catch
		--thong bao ra error
		throw
	end catch
end
GO

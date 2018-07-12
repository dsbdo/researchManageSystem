drop procedure if exists adminGetInstituteListInfo;
delimiter $$
create procedure adminGetInstituteListInfo ()
begin
	#查询研究机构的相关信息，后面需要包括每一个研究机构的秘书还有研究室主任， 还有研究室的工作地点，点击查询的时候，再返回这些详情
    select * from graduateinstitute;
end
$$
delimiter ;

drop procedure if exists adminGetSecretaryInfo;
delimiter $$
create procedure adminGetSecretaryInfo (IN local_secretary_id char(12))
begin
	#查询研究机构的相关信息，后面需要包括每一个研究机构的秘书还有研究室主任， 还有研究室的工作地点，点击查询的时候，再返回这些详情
    select * from secretary where secretary_id = local_secretary_id;
end
$$
delimiter ;

#查询工作地点
drop procedure if exists adminGetWorkplaceInfo;
delimiter $$
create procedure adminGetWorkplaceInfo (IN local_institute_id char(12))
begin
	#查询研究机构的相关信息，后面需要包括每一个研究机构的秘书还有研究室主任， 还有研究室的工作地点，点击查询的时候，再返回这些详情
    select workplace.work_place_id, workplace.area, workplace.place_address from workplace where workplace.graduate_institute_id = local_institute_id ;
end
$$
delimiter ;


#查询科研人员
drop procedure if exists adminGetResearchPeopleListInfo;
delimiter $$
create procedure  adminGetResearchPeopleListInfo()
begin
	select * from researchpeople ;
end
$$
delimiter ;

#查询项目
drop procedure if exists adminGetProjectListInfo;
delimiter $$
create procedure adminGetProjectListInfo()
begin 
	select * from researchproject;
end
$$
delimiter ;

#查询参与该项目的科研人员,先查着， 有需要再改
drop procedure if exists adminGetProjectPeople;
delimiter $$
create procedure adminGetProjectPeople(IN local_project_id int)
begin 
	select * from projectpeoplelist where projectpeoplelist.project_id = local_project_id;
end
$$
delimiter ; 

#查询监管方，委托方，合作方
drop procedure if exists adminGetProjectPrincipalList;
delimiter $$
create procedure adminGetProjectPrincipalList (IN local_project_id int) 
begin
	select * from principallist where principallist.project_id = local_project_id;
end
$$
delimiter ;

#查询监管方
drop procedure if exists adminGetProjectSupervisionList;
delimiter $$
create procedure adminGetProjectSupervisionList (IN local_project_id int) 
begin
	select * from supervisionlist where supervisionlist.project_id = local_project_id;
end
$$
delimiter ;

#查询合作方
drop procedure if exists adminGetProjectParterlist;
delimiter $$
create procedure adminGetProjectParterList (IN local_project_id int) 
begin
	select * from parterlist where parterlist.project_id = local_project_id;
end
$$
delimiter ;

#查询负责人
drop procedure if exists adminGetPrincipalPeople;
delimiter $$
create procedure adminGetPrincipalPeople(IN local_principal_id int)
begin 
	select principalpeople.office_phone, principalpeople.mobile_phone, principalpeople.mail_address from principalpeople where principalpeople.principal_id = local_principal_id;
end
$$
delimiter ;

#查询联系人
drop procedure if exists adminGetContractPeople;
delimiter $$
create procedure adminGetContractPeople(IN local_contract_id int)
begin
	select contractpeople.office_phone,  contractpeople.mobile_phone,  contractpeople.mail_address from contractpeople where  contractpeople.contract_id =local_contract_id;
end
$$
delimiter ;

#查询科研成果,根据project_id 进行查询
drop procedure if exists adminGetAchievementList;
delimiter $$
create procedure adminGetAchievementList(IN local_project_id int) 
begin
	select * from researchAchievement where researchAchievement.project_id  = local_project_id;
end
$$
delimiter ;
#根据achievement_id 查询贡献者列表
drop procedure if exists adminGetAchievementContributor;
delimiter $$
create procedure adminGetAchievementContributor(IN local_achievement_id int)
begin 
	select * from achievementcontributor where achievementcontributor.achievement_id = local_achievement_id;
end
$$
delimiter ;


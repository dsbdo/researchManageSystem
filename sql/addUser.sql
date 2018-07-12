use researchDatabase;

#秘书 001， 办公场地 002， 研究所 003， 研究人员004， 公司 005
drop procedure if exists addUser;
delimiter $$
#work_id passwd, user_type
create procedure addUser(IN user_role varchar(30), OUT work_id char(12))
 begin
	#根据用户类型生成work_id, 年份(4位)， 类型（3位）， 排号（5位），生成初始化密码
    #生成年份
    declare year_string char(4);
    declare type_num_string char(3);
    declare id_num_string char(5);
	SET year_string = (select year(now()));
    SET type_num_string = (select 
    case user_role
    when 'secretary' then '001'
    when 'workPlace' then '002'
    when 'institute' then '003'
    when 'researchPeople' then '004'
    when 'company' then '005'
    else '999'
    end as type_num);
    SET id_num_string = (select count(*)+1 from users where users.user_role = user_role);
	while char_length(id_num_string)< 5 do
	set id_num_string = (select CONCAT('0', id_num_string));
	end while;
    SET work_id = (select CONCAT(year_string, type_num_string, id_num_string));
    insert into users value(NULL, work_id, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', user_role);
    #select work_id;
 end
 $$
delimiter ;
#call addUser('test', @out);
#select *
#from users
#select @out;
#drop procedure addUser;
#添加秘书
drop procedure if exists  adminAddSecretary;
delimiter $$
create procedure adminAddSecretary(IN user_type varchar(30), IN secretary_name varchar(50), IN gender smallInt, In age smallint, IN employee_time date, IN employee_responsibility varchar(100))
begin
	declare workId char(12);
	call addUser(user_type, @out);
	SET workId = @out;
    insert into secretary values(workId, secretary_name, gender, age, employee_time, employee_responsibility);
end
$$
delimiter ;

#添加研究所
drop procedure if exists adminAddInstitute;
delimiter $$
create procedure adminAddInstitute(IN user_type varchar(30),IN local_name varchar(50), IN info varchar(100), IN secretary_id char(12))
begin
	declare workId char(12);
    call addUser(user_type, @out);
	SET workId = @out;
    insert into graduateInstitute values (workId, local_name, info, secretary_id);
end
$$
delimiter ;

#添加科研人员
drop procedure if exists adminAddResearchPeople;
delimiter $$
create procedure adminAddResearchPeople(IN user_type varchar(30), IN research_people_name varchar(50), IN gender smallint, In age smallint, IN job_title varchar(50), IN research_direction varchar(50), IN graduate_institute_id char(12)) 
begin
	declare workId char(12);
    call addUser(user_type, @out);
    SET workId = @out;
    insert into researchpeople values(workId, research_people_name, gender, age, job_title, research_direction, graduate_institute_id);
end
$$
delimiter ;


#添加工作地点 
drop procedure if exists adminAddWorkPlace;
delimiter $$
create procedure adminAddWorkPlace(IN user_type varchar(30), IN area real, IN place_address varchar(50), IN graduate_institute_id char(12))
begin
	declare workId char(12);
	call addUser(user_type, @out);
	SET workId = @out;
    #拿到workId以后插入表
    insert into workPlace values(workId, area, place_address, graduate_institute_id);
end
$$
delimiter ;


#添加公司
drop procedure if exists adminAddCompany;
delimiter $$
create procedure adminAddCompany(IN user_type varchar(30),IN company_name varchar(100), IN company_address varchar(100))
begin
	declare workId char(12);
	call addUser(user_type, @out);
	SET workId = @out;
    insert into company values(workId, company_name, company_address);
end
$$
delimiter ;




#添加研究室主任
drop procedure if exists adminAddInstituteDirector;
delimiter $$
create procedure adminAddInstituteDirector(IN local_institute_id char(12), IN local_research_people_id char(12), IN local_office_time date, IN local_office_term double)
begin
	insert into institutedirector values(local_institute_id, local_research_people_id, local_office_time, local_office_term);
end
$$
delimiter ;

#添加项目，同时需要添加合作方，委托方，添加合作方与委托方的过程中还需要添加负责人与联系人的信息
#添加项目成果表
drop procedure if exists adminAddAchievement;
delimiter $$
create procedure adminAddAchievement (IN local_name varchar(50), IN local_time date, IN local_rank int, IN local_project_id int, IN local_type varchar(20), IN local_info varchar(100), IN local_patent_type varchar(20), OUT out_achievement_id int)
begin
	insert into researchachievement values(NULL, local_name, local_time, local_rank, local_project_id, local_type, local_info, local_patent_type);
    SET out_achievement_id = (select max(researchachievement.achievement_id) from researchachievement);
    select out_achievement_id;
end
$$
delimiter ;
drop procedure if exists adminAddAhievementContributor;
delimiter $$
create procedure adminAddAhievementContributor (IN local_achievement_id int, IN local_project_id int, local_research_people_id char(12))
begin 
	insert into achievementcontributor values(local_achievement_id, local_project_id, local_research_people_id);
end
$$
delimiter ;

#添加联系人
drop procedure if exists adminAddContractPeople;
delimiter $$
create procedure adminAddContractPeople(IN local_office_phone varchar(20), IN local_mobile_phone varchar(20), IN local_mail_address varchar(20))
begin
	insert into contractpeople values(NULL, local_office_phone, local_mobile_phone, local_mail_address);
end
$$
delimiter ;

#添加负责人
drop procedure if exists adminAddPrincipalPeople;
delimiter $$
create procedure adminAddPrincipalPeople(IN local_office_phone varchar(20), IN local_mobile_phone varchar(20), IN local_mail_address varchar(20))
begin
	insert into principalpeople values(NULL, local_office_phone, local_mobile_phone, local_mail_address);
end
$$
delimiter ;

#添加合作方
drop procedure if exists adminAddParterList;
delimiter $$
create procedure adminAddParterList (IN local_project_id int, IN local_company_id char(12), IN local_contract_id int, IN local_principal_id int)
begin
	insert into parterlist values(local_project_id, local_company_id, local_contract_id, local_principal_id);
end
$$
delimiter ;

#添加委托方
drop procedure if exists adminAddPrincipalList;
delimiter $$
create procedure adminAddPrincipalList (IN local_project_id int, IN local_company_id char(12), IN local_contract_id int, IN local_principal_id int)
begin
	insert into principallist values(local_project_id, local_company_id, local_contract_id, local_principal_id);
end
$$
delimiter ;

#添加监管方
drop procedure if exists adminAddSupervisionList;
delimiter $$
create procedure adminAddSupervisionList (IN local_project_id int, IN local_company_id char(12), IN local_contract_id int, IN local_principal_id int)
begin
	insert into supervisionlist  values(local_project_id, local_company_id, local_contract_id, local_principal_id);
end
$$
delimiter ;

#添加子课题
drop procedure if exists adminAddSubTopic;
delimiter $$
create procedure adminAddSubTopic(IN local_project_id int, IN local_principal_man char(12), IN time_condition varchar(20),  IN local_funding double, IN tech_condition varchar(50))
begin
	insert into subtopic values(local_project_id, NULL, local_principal_man, time_condition, local_funding, tech_condition);
end
$$
delimiter ;

#添加项目
drop procedure if exists adminAddResearchProject;
delimiter $$
create procedure adminAddResearchProject(IN local_principal_people_id char(12), IN local_project_name varchar(100), IN local_research_content varchar(100), IN local_total_funding double, IN local_start_time date, IN local_finish_time date, OUT out_project_id int)
begin
	insert into researchproject values(NULL, local_principal_people_id, local_project_name, local_research_content, local_total_funding, local_start_time ,local_finish_time);
    SET out_project_id = (select max(researchproject.project_id) from researchproject);
    select out_project_id;
end
$$
delimiter ;

#添加参与项目情况表
drop procedure if exists adminAddProjectPeopleList;
delimiter $$
create procedure  adminAddProjectPeopleList(IN local_research_people_id char(12), IN local_project_id int, IN local_join_time date, IN local_funding double, IN local_project_workload int)
begin
	insert into projectpeoplelist values(local_research_people_id, local_project_id, local_join_time, local_funding, local_project_workload);
end
$$
delimiter ;


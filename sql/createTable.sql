#real 单精度浮点数，double precision 双精度浮点数， numeric(b,p);b位数字，精度位p

#秘书表

use researchDatabase;
#这张表用以维护简单的登录功能
DROP TABLE IF EXISTS `users`;
CREATE TABLE users (
	user_id int auto_increment,
    user_passwd varchar(50),
    user_role varchar(10),
    PRIMARY KEY (user_id)
)auto_increment =1;
DROP TABLE IF EXISTS `secretary`;
CREATE TABLE secretary (
    secretary_id int AUTO_INCREMENT,
    secretary_name varchar(50),
    gender smallint,
    age smallint,
    employee_time date,
    employee_responsibility varchar(100),
    PRIMARY KEY (secretary_id)
)AUTO_INCREMENT = 1;

#研究室表
DROP TABLE IF EXISTS `graduateInstitute`;
CREATE TABLE graduateInstitute (
    graduate_institute_id int AUTO_INCREMENT,
    info varchar(100),
    secretary_id int ,
    PRIMARY KEY (graduate_institute_id),
    FOREIGN KEY (secretary_id) references secretary(secretary_id)
)AUTO_INCREMENT = 1;



DROP TABLE IF EXISTS `workPlace`;
CREATE TABLE workPlace (
    work_place_id int AUTO_INCREMENT,
    area real,
    place_address varchar(50),
    graduate_institute_id int,
    PRIMARY KEY(work_place_id) ,
    FOREIGN KEY(graduate_institute_id) references graduateInstitute( graduate_institute_id )
)AUTO_INCREMENT = 1;

#科研人员表

DROP TABLE IF EXISTS `researchPeople`;
CREATE TABLE researchPeople (
    research_people_id int AUTO_INCREMENT,
    research_people_name varchar(50),
    gender smallint,
    age smallint,
    job_title varchar(50),
    research_direction varchar(50),
    graduate_institute_id int,
    PRIMARY KEY (research_people_id),
    FOREIGN KEY (graduate_institute_id) references graduateInstitute (graduate_institute_id)
)AUTO_INCREMENT = 1;

#办公室主任表

DROP TABLE IF EXISTS `instituteDirector`;
CREATE TABLE instituteDirector (
    graduate_institute_id int AUTO_INCREMENT,
    research_people_id int,
    office_time date,
    office_term real,
    PRIMARY KEY (graduate_institute_id, research_people_id),
    FOREIGN KEY (graduate_institute_id) references graduateInstitute(graduate_institute_id),
    FOREIGN KEY (research_people_id) references researchPeople(research_people_id)
)AUTO_INCREMENT = 1;



#科研项目表
DROP TABLE IF EXISTS `researchProject`;
CREATE TABLE researchProject (
    project_id int AUTO_INCREMENT,
    project_principal_man int,
    projetc_name varchar(100),
    research_content varchar(100),
    total_funding double precision,
    start_time date,
    finish_time date,
    PRIMARY KEY (project_id)
)AUTO_INCREMENT = 1;

#参与项目的情况
DROP TABLE IF EXISTS `projectPeopleList`;
CREATE TABLE projectPeopleList (
    research_people_id int,
    project_id int,
    join_time date,
    control_funding double precision,
    project_workload int,
    PRIMARY KEY (research_people_id, project_id),
    FOREIGN KEY (research_people_id) references researchPeople(research_people_id),
    FOREIGN KEY (project_id) references researchProject(project_id)
);


#项目子课题表
DROP TABLE IF EXISTS `subTopic`;
CREATE TABLE subTopic(
    project_id int,
    serial_id int,
    principal_man int,
    time_condition varchar(20),
    sub_topic_total_funding double precision,
    technology_condition varchar(50),
    PRIMARY KEY (project_id, serial_id),
    FOREIGN KEY (project_id) references researchProject(project_id),
    FOREIGN KEY (principal_man) references researchPeople(research_people_id)
);

#公司表
DROP TABLE IF EXISTS `company`;
CREATE TABLE company (
    company_id int,
    company_name varchar(100),
    company_address varchar(100),
    PRIMARY KEY(company_id)
);

#联系人表
DROP TABLE IF EXISTS `contractPeople`;
CREATE TABLE contractPeople (
    contract_id int AUTO_INCREMENT,
    office_phone varchar(20),
    mobile_phone varchar(20),
    mail_address varchar(20),
    PRIMARY KEY (contract_id)
);


#联系人表
DROP TABLE IF EXISTS `principalPeople`;
CREATE TABLE principalPeople (
    principal_id int AUTO_INCREMENT,
    office_phone varchar(20),
    mobile_phone varchar(20),
    mail_address varchar(20),
    PRIMARY KEY (principal_id)
);

#项目合作方
DROP TABLE IF EXISTS `parterList`;
CREATE TABLE parterList (
    project_id int,
    company_id int,
    contract_id int,
    principal_id int,
    PRIMARY KEY (project_id, company_id, contract_id),
    FOREIGN KEY (project_id) references researchProject(project_id),
    FOREIGN KEY (company_id) references company(company_id),
    FOREIGN KEY (contract_id) references contractPeople(contract_id),
    FOREIGN KEY (principal_id) references principalPeople(principal_id)
);

#项目委托方
DROP TABLE IF EXISTS `principalList`;
CREATE TABLE principalList (
    project_id int,
    company_id int,
    contract_id int,
    principal_id int,
    PRIMARY KEY (project_id, company_id, contract_id),
    FOREIGN KEY (project_id) references researchProject(project_id),
    FOREIGN KEY (company_id) references company(company_id),
    FOREIGN KEY (contract_id) references contractPeople(contract_id),
    FOREIGN KEY (principal_id) references principalPeople(principal_id)
);
#项目监督方
DROP TABLE IF EXISTS `superVisionList`;
CREATE TABLE superVisionList (
    project_id int,
    company_id int,
    contract_id int,
    principal_id int,
    PRIMARY KEY (project_id, company_id, contract_id),
    FOREIGN KEY (project_id) references researchProject(project_id),
    FOREIGN KEY (company_id) references company(company_id),
    FOREIGN KEY (contract_id) references contractPeople(contract_id),
    FOREIGN KEY (principal_id) references principalPeople(principal_id)
);

#科研成果列表
DROP TABLE IF EXISTS `researchAchievement`;
CREATE TABLE researchAchievement (
    achievement_id int AUTO_INCREMENT,
    achievement_name varchar(50),
    get_time date,
    achievement_rank int,
    project_id int,
    achievement_type varchar(20),
    achievement_info varchar(100),
    patent_type varchar(20) NULL,
    PRIMARY KEY (achievement_id),
    FOREIGN KEY (project_id) references researchProject(project_id)
);

#科研成果贡献者 
DROP TABLE IF EXISTS `achievementContributor`;
CREATE TABLE achievementContributor (
    achievement_id int,
    project_id int,
    research_people_id int,
    PRIMARY KEY (achievement_id),
    FOREIGN KEY (achievement_id) references researchAchievement(achievement_id),
    FOREIGN KEY (project_id) references researchProject(project_id),
    FOREIGN KEY (research_people_id) references researchPeople(research_people_id)
);
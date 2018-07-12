
 
#更新值alter
 update users set work_id = '201800000001';
#删除一行
delete from users where user_id = 2;
insert into users values(NULL, '201800000001', '2d0bd409adca8227ddf46906fc4768647e0db0516311055c9f69b49be7ec8af8','admin');
insert into users values(NULL, '201800010001', '2d0bd409adca8227ddf46906fc4768647e0db0516311055c9f69b49be7ec8af8','researchPeople');
insert into users values(NULL, '201899999999', '2d0bd409adca8227ddf46906fc4768647e0db0516311055c9f69b49be7ec8af8','测12');
#增加字段
alter table users add user_name varchar(20);

#增加字段 年份四位-预留字段4位-研究人员编号
alter table users add work_id char(12);
alter table graduateinstitute add institute_name varchar(50);
alter table graduateinstitute change institute_name institute_name varchar(50) after graduate_institute_id;
select * from graduateinstitute;

update graduateinstitute set institute_name = "blockchain institute  ff" where graduate_institute_id = '201899900020';
#修改字段顺序
alter table users change work_id work_id char(12) after user_id;
#修改字段属性
alter table users MODIFY user_role varchar(30);

alter table users MODIFY user_passwd char(64);

#更改自增值alter
alter table users auto_increment = 1;

drop procedure checkadmin;

#存储过程调用
call checkAdmin('201800000001','2d0bd409adca8227ddf46906fc4768647e0db0516311055c9f69b49be7ec8af8', @out);
call checkGeneralUser('201800010001','2d0bd409adca8227ddf46906fc4768647e0db0516311055c9f69b49be7ec8af8', @out);

select *
from users;

select char_length('qqqq');
select year(now());
select
 case '1' when '1' then 'nan' when '0' then 'nv' end as type_num;
  select CONCAT('My', 'S', 'QL');
#8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92 默认密码‘123456’
select count(*)+1
from users;




select current_date();
CALL adminAddSecretary('test', 'dsbdo2', 1, 22, current_date(), 'eat and drink');
select *
from secretary;

CALL adminAddInstitute('test', 'blockchain', '201899900004');
select *
from graduateinstitute;

CALL adminAddResearchPeople('researchPeople','Doctor Mu', 1, 150, 'phlisosphe', 'emmmmm decenter database', '201899900007');
CALL adminAddWorkPlace('workPlace',200, 'china scut C10', '201899900007');
CALL adminAddCompany('company','real company second', 'scut south campus c10');



insert into principalpeople values(NULL, '129 0000 0000', '129 0000 0000', '129 0000 0000@qq.com');

insert into contractpeople values(NULL, '444 1111 1111', '444 1111 1111', '444 1111 1111@qq.com');
select *
from researchpeople;
select *
from workplace;
select current_date();

select *
from users;
delete from workplace where work_place_id = '201800200002';
select *
from company;
insert into workplace values('2018');



select *
from graduateinstitute;

select *
from researchpeople;


delete from researchproject where project_id =2;
select *
from researchproject;

select * 
from projectpeoplelist;
use researchdatabase;

select *
from principallist;
select *
from parterlist;

select * from supervisionlist;

select *
from contractPeople;
select *
from researchachievement;

select *
from achievementcontributor;
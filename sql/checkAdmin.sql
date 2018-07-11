#创建一个管理员登陆的procedure
use researchDatabase;

#增加字段
alter table users add user_name varchar(20);

#增加字段 年份四位-预留字段4位-研究人员编号
alter table users add work_id char(12);

#修改字段顺序
alter table users change work_id work_id char(12) after user_id;
#修改字段属性
alter table users MODIFY user_role varchar(30);

alter table users MODIFY user_passwd char(64);

#更改自增值alter
alter table users auto_increment = 1;
 
 
 #更新值alter
 update users set work_id = '201800000001';
#删除一行
delete from users where user_id = 2;
insert into users values(NULL, '201800000001', '2d0bd409adca8227ddf46906fc4768647e0db0516311055c9f69b49be7ec8af8','admin');
insert into users values(NULL, '201800010001', '2d0bd409adca8227ddf46906fc4768647e0db0516311055c9f69b49be7ec8af8','researchPeople');


#检查是否是admin用户
delimiter $$
create procedure checkAdmin(IN workID char(12), IN passwd char(64),  OUT isAdmin int1)
begin
declare table_admin_passwd varchar(64);
SET table_admin_passwd = (select users.user_passwd
					from users
					where users.user_id = 1 and work_id = workID);
 IF table_admin_passwd = passwd THEN
	set isAdmin = 1;
ELSE
	set isAdmin = 0;
END IF;
select isAdmin;
end
$$
delimiter ;




#检查是否是合法用户
delimiter $$
create procedure checkGeneralUser (IN workID char(12), IN passwd char(64), OUT isValidUser int1) 
begin 
	declare user_passwd char(64);
    SET user_passwd = (select users.user_passwd from users where users.work_id = workID);
    if user_passwd = passwd then
		set isValidUser = 1;
	else 
		set isValidUser = 0;
	end if;
    select isValidUser;
end
$$
delimiter ;




drop procedure checkadmin;

#存储过程调用
call checkAdmin('201800000001','2d0bd409adca8227ddf46906fc4768647e0db0516311055c9f69b49be7ec8af8', @out);
call checkGeneralUser('201800010001','2d0bd409adca8227ddf46906fc4768647e0db0516311055c9f69b49be7ec8af8', @out);

select *
from users
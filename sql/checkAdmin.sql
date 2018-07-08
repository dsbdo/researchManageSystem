#创建一个管理员登陆的procedure
use researchDatabase;

#增加字段
alter table users add user_name varchar(20);

#增加字段 年份四位-预留字段4位-研究人员编号
alter table users add work_id char(12);

#修改字段顺序
alter table users change work_id work_id char(12) after user_id;
#修改字段属性
alter table users MODIFY user_name varchar(40);

alter table users MODIFY user_passwd char(64);

#更改自增值alter
 alter table users auto_increment = 1;
 
 
 #更新值alter
 update users set work_id = '201800000001';
#删除一行
delete from users where user_id = 2;
insert into users values(NULL, 'researchDatabaseSuperAdmin', '2d0bd409adca8227ddf46906fc4768647e0db0516311055c9f69b49be7ec8af8', 'admin');



delimiter $$
create procedure checkAdmin(IN workID char(12), IN adminName varchar(40), IN passwd char(64),  OUT isAdmin int)
begin
declare table_admin_passwd varchar(64);
SET table_admin_passwd = (select users.user_passwd
					from users
					where users.user_id = 1 and user_name = 'researchDatabaseSuperAdmin' and work_id = '201800000001');
 IF table_admin_passwd = passwd THEN
	set isAdmin = 1;
ELSE
	set isAdmin = 0;
END IF;
select isAdmin;
end
$$
delimiter ;
drop procedure checkadmin;

#存储过程调用
call checkAdmin('201800000001','researchDatabaseSuperAdmin','2d0bd409adca8227ddf46906fc4768647e0db0516311055c9f69b49be7ec8af8', @out);
select @out;

select *
from users
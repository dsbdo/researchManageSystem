#删除用户比较简单根据拿到的work_id 进行删除即可，这是删除五大类的方法
drop procedure if exists deleteUser;
delimiter $$
create procedure deleteUser(IN local_work_id char(12))
begin
	declare local_user_role varchar(50);
    declare local_table_name varchar(50);
    declare field_name varchar(50);
    SET local_user_role = (select users.user_role from users where users.work_id = local_work_id);
    SET local_table_name = (select (case local_user_role when 'secretary' then 'secretary' when 'workPlace' then 'workplace' when 'institute' then 'graduateinstitute' when 'researchPeople' then 'researchpeople' when 'company' then 'company' else 'users' end ) as temp_table_name);
    SET field_name = (select (case local_user_role when 'secretary' then 'secretary_id' when 'workPlace' then 'work_place_id' when 'institute' then 'graduate_institute_id' when 'researchPeople' then 'research_people_id' when 'company' then 'company_id' else 'work_id' end ) as temp_table_name);
  
    
	SET @v_sql = (select concat(' delete from ', local_table_name, ' where ', field_name, '=' , local_work_id));
	
    select local_user_role, local_table_name, field_name, @v_sql;
    prepare stmt from @v_sql; 
	EXECUTE stmt;    
	deallocate prepare stmt;   
    
    #delete from local_table_name where field_name = local_work_id;
    delete from users where users.work_id = local_work_id;
end
$$
delimiter ;
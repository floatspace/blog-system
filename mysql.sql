-- base
show databases;
use myblog;
show tables;

-- 增
insert into users (username, `password`, realname) values ('admin', '123', '赵云');
insert into blogs (title, content, createtime, author) values ('标题C', '内容C', 1581942435292, 'lisi');

-- 删
delete from users where username='zhaoyun';

-- 改
update users set state='0' where username='admin';
update blogs set title='标题1',content='标题1' where id='6';

-- 查
select * from users;
select * from blogs;
select username, password from users;
select * from blogs where title like '%标题%' order by createtime desc;
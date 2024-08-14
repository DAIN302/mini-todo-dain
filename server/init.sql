 show databases;
 
 use codingon;
 
 create table Todo (
	id int not null primary key auto_increment,
    title varchar(100) not null,
    done boolean not null default false
 );

desc todo;

select * from todo;

insert into todo values 
(null, 'my todo1', 0),
(null, 'my todo2', 0),
(null, 'my todo3', 1),
(null, 'my todo4', 0),
(null, 'my todo5', 1),
(null, 'my todo6', 0);

update todo set title = "내가 할일 2번" where id ="2";
update todo set title = "내가 할일 5번" where id ="5";

delete from todo where id = '3';

select * from mysql.user;

create user 'user'@'%' identified with mysql_native_password by '1234';

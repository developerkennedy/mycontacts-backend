create database mycontacts;
create extension "uuid-ossp";

create table if not exists categories(
    id UUID not null unique default uuid_generate_v4(),
    name varchar not null
);

create table if not exists contacts(
    id UUID not null unique default uuid_generate_v4(),
    name varchar not null,
    email varchar not null unique,
    phone varchar,
    categoryId UUID,
    foreign key(categoryId) references categories(id)
);
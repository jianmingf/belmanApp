drop schema if exists belman cascade;
create schema if not exists belman;

create table belman.category (
                                 id text primary key not null,
                                 name text not null,
                                 description text not null
);

create table belman.product (
                                id text primary key not null,
                                reference text unique not null,
                                name text not null,
                                category_id text not null references belman.category(id),

                                size text not null,
                                material text not null,
                                pressure text not null,
                                temperature text not null,
                                description text not null,

                                zone text not null,
                                shelf text not null,
                                bin text not null,

                                stock_quantity integer not null,
                                max_stock integer not null,

                                created_at timestamp with time zone not null default now(),
                                updated_at timestamp with time zone not null default now(),

                                constraint stock_quantity_not_negative check (stock_quantity >= 0),
                                constraint max_stock_positive check (max_stock > 0),
                                constraint stock_not_more_than_max check (stock_quantity <= max_stock)
);

create table belman.dispatch_request (
                                         id text primary key not null,
                                         product_id text not null references belman.product(id),

                                         status text not null,
                                         requested_by text not null,
                                         workshop text not null,

                                         requested_at timestamp with time zone not null default now(),
                                         completed_at timestamp with time zone default null,

                                         constraint dispatch_status_check check (
                                             status in ('Pending', 'In Progress', 'Completed', 'Cancelled')
                                             )
);

create table belman.inventory_alert (
                                        id text primary key not null,
                                        product_id text not null references belman.product(id),

                                        alert_type text not null,
                                        severity text not null,
                                        message text not null,

                                        stock_quantity integer not null,
                                        max_stock integer not null,
                                        stock_percentage numeric not null,

                                        is_resolved boolean not null default false,
                                        created_at timestamp with time zone not null default now(),
                                        resolved_at timestamp with time zone default null,

                                        constraint alert_type_check check (
                                            alert_type in ('Low Inventory')
                                            ),

                                        constraint alert_severity_check check (
                                            severity in ('Info', 'Warning', 'Critical')
                                            )
);
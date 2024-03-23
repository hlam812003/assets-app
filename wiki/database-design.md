Q# Database Design

## Department

- `department_id-`: INT
- `department_name`: VARCHAR(100)

```sql
CREATE TABLE `department` (
  `department_id` int NOT NULL,
  `department_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## User

- `user_id`: INT
- `first_name`: VARCHAR(45)
- `last_name`: VARCHAR(45)
- `department_id`: INT
  - FOREIGN_KEY: `fk_user_department`
    - Target: `department (department_id -> department_id)`
- `role`: VARCHAR(45)
  - `"Organizer"`
  - `"Manager"`

```sql
CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `first_name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `last_name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `role` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `department_id_idx` (`department_id`),
  CONSTRAINT `fk_user_department` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Authentication

- `user_id`: INT
  - FOREIGN_KEY: `fk_authentication_user`
    - Target: `user (user_id -> user_id)`
- `username`: VARCHAR(45)
- `password`: VARCHAR(45)

```sql
CREATE TABLE `authentication` (
  `user_id` int NOT NULL,
  `username` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_authentication_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

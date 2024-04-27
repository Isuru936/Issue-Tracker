package com.issue_tracker.issur_tracker.repository;

import com.issue_tracker.issur_tracker.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}

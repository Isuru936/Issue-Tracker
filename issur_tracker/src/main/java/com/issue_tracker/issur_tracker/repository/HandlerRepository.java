package com.issue_tracker.issur_tracker.repository;

import com.issue_tracker.issur_tracker.model.Handler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HandlerRepository extends JpaRepository<Handler, Long> {
    // If you need custom query methods, you can define them here
}

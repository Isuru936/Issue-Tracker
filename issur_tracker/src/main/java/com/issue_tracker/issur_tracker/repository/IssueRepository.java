package com.issue_tracker.issur_tracker.repository;

import com.issue_tracker.issur_tracker.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // this is the data access layer, responsible for data access
public interface IssueRepository extends JpaRepository<Issue, Long> {

    //there is a logic about duplicate email addresses, do this later. 1:08:00 to technical services
}

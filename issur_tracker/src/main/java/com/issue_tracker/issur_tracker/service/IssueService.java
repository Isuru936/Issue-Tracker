package com.issue_tracker.issur_tracker.service;

import com.issue_tracker.issur_tracker.repository.IssueRepository;
import com.issue_tracker.issur_tracker.model.Issue;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
//THIS IS RESPONSIBLE FOR THE BUSINESS LOGIC (SERVICE LAYER)

@Service // this class is meant to be a service class so we do this
public class IssueService {
    private final IssueRepository issueRepository;

    @Autowired
    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public List<Issue> getIssue() {
        return issueRepository.findAll(); // this easily fetches Issues from the database
    }

    public void addNewIssue(Issue issue) {
        issueRepository.save(issue);
        System.out.println(issue);
    }

    public void deleteIssue(Long issueId) {
        boolean exists = issueRepository.existsById(issueId);
        if (!exists) {
            throw new IllegalStateException("Student with Id " + issueId + " does not exists");
        }
        issueRepository.deleteById(issueId);
    }

    @Transactional
    public void updateIssue(Long issueId, String technician, LocalDateTime issueAssigned) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new IllegalStateException(
                        "issue with id " + issueId + "does not exist"));

        // ADD LOGICS / VALIDATIONS LIKE THESE
        // if(email != null && email.length() > 0 && !Objects.equals(issue.getEmail(),
        // email)){
        // issue.setEmail(email);
        // }

        // Update email if not null
        if (technician != null) {
            issue.setTechnician(technician);
            System.out.println(technician);
            System.out.println(issue.getTechnician());
        } else {
            throw new IllegalStateException("Technician null or not foun");
        }

        // Update issueCreated if not null
        if (issueAssigned != null) {
            issue.setIssueAssigned(issueAssigned);
            System.out.println(issueAssigned);
        } else {
            throw new IllegalStateException("Issue Assigned not found or NULL");
        }

        issue.setStatus(1);
    }
}

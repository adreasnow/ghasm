package main

import (
	"context"
	"fmt"
	"os"

	"github.com/google/go-github/v84/github"
	"github.com/sethvargo/go-githubactions"
)

func main() {
	ghCtx, err := githubactions.Context()

	ctx := context.WithValue(context.Background(), "ghCtx", ghCtx)
	if err != nil {
		githubactions.Fatalf("failed to get context: %v", err)
	}

	client := github.NewClient(nil).WithAuthToken(os.Getenv("GITHUB_TOKEN"))

	for _, env := range os.Environ() {
		fmt.Println(env)
	}

	owner, repo := ghCtx.Repo()

	pr, _, err := client.PullRequests.List(ctx, owner, repo, &github.PullRequestListOptions{})
	if err != nil {
		githubactions.Fatalf("failed to get pull request: %v", err)
	}

	fmt.Printf("%v", pr)
}

package main

import (
	"github.com/adreasnow/ghasm/internal/app/validateinputs"
	"github.com/sethvargo/go-githubactions"
)

func main() {
	if err := validateinputs.ValidateInputs(); err != nil {
		githubactions.Fatalf("%v", err)
	}
}

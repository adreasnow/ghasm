package main

import (
	"os"

	"github.com/adreasnow/ghasm/internal/app/validateinputs"
	"github.com/sethvargo/go-githubactions"
)

func main() {
	if err := validateinputs.ValidateInputs(); err != nil {
		githubactions.Debugf("%v", err)
		os.Exit(1)
	}
}

package validateinputs

import (
	"context"

	readinputs "github.com/adreasnow/ghasm/internal/pkg/readinputs"
	"github.com/adreasnow/ghasm/internal/pkg/validateinputs"
	"golang.org/x/sync/errgroup"
)

func getInputRequirements() (requirements validateinputs.Requirements, err error) {
	g, _ := errgroup.WithContext(context.Background())

	g.Go(func() error { return readinputs.GetListInput("required", false, &requirements.Required) })
	g.Go(func() error { return readinputs.GetYAMLInput("enum", &requirements.Enum) })
	g.Go(func() error { return readinputs.GetYAMLInput("and", &requirements.And) })
	g.Go(func() error { return readinputs.GetYAMLInput("or", &requirements.Or) })
	g.Go(func() error { return readinputs.GetYAMLInput("required_or", &requirements.RequiredOr) })

	if err := g.Wait(); err != nil {
		return requirements, err
	}

	return
}

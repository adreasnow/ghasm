package validateinputs

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestRequired(t *testing.T) {
	t.Parallel()

	t.Run("provided", func(t *testing.T) {
		inputs := Inputs{
			"required-input-1": "value1",
			"required-input-2": "value2",
		}

		required := []string{
			"required-input-1",
			"required-input-2",
		}

		require.NoError(t, inputs.required(required))
	})

	t.Run("missing", func(t *testing.T) {
		inputs := Inputs{
			"required-input-1": "value1",
		}

		required := []string{
			"required-input-1",
			"missing-required-input",
		}

		require.Error(t, inputs.required(required))
	})
}

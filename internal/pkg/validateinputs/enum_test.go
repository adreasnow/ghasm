package validateinputs

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestEnum(t *testing.T) {
	t.Parallel()

	t.Run("valid", func(t *testing.T) {
		inputs := Inputs{
			"input": "value-in-enum",
		}

		validInputs := map[string][]string{
			"input": {"value-in-enum"},
		}

		require.NoError(t, inputs.enum(validInputs))
	})

	t.Run("invalid", func(t *testing.T) {
		inputs := Inputs{
			"input": "value-not-in-enum",
		}

		validInputs := map[string][]string{
			"input": {"value-in-enum"},
		}

		require.Error(t, inputs.enum(validInputs))
	})
}

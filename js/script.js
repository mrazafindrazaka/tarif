$(document).ready(function () {
    /* Fonction de filtrage pour autoriser uniquement les nombres. */
    (function ($) {
        $.fn.inputFilter = function (inputFilter) {
            return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                }
            });
        };
    }(jQuery));
    $("#revenu").inputFilter(function (value) {
        return /^-?\d*[.,]?\d{0,2}$/.test(value);
    });

    /* Fonction de calcul. */
    let calcul = function () {
        let revenu = parseFloat($("#revenu").val());
        let radio = parseInt($("input[name='option']:checked").val());
        let tarif_collectif = 0;
        let tarif_familial = 0;
        let result_collectif;
        let result_familial;

        /*
        ** Revenus minimums et maximums prisent en compte. (à changer aussi dans index.html)
        ** min = minimum
        ** max = maximum
        */

        let min = 8463.24;
        let max = 67200;

        if (!revenu)
            revenu = min;
        if (revenu < min)
            revenu = min;
        else if (revenu > max)
            revenu = max;

        /*
        ** Taux pour le tarif collectif et familial par nombre d'enfants.
        **
        ** exemple: case 8 représente le taux pour 8 enfants et plus.
        */

        switch (radio) {
            case 1:
                tarif_collectif = 0.0610;
                tarif_familial = 0.0508;
                break;
            case 2:
                tarif_collectif = 0.0508;
                tarif_familial = 0.0406;
                break;
            case 3:
                tarif_collectif = 0.0406;
                tarif_familial = 0.0305;
                break;
            case 4:
                tarif_collectif = 0.0305;
                tarif_familial = 0.0305;
                break;
            case 5:
                tarif_collectif = 0.0305;
                tarif_familial = 0.0305;
                break;
            case 6:
                tarif_collectif = 0.0305;
                tarif_familial = 0.0203;
                break;
            case 7:
                tarif_collectif = 0.0305;
                tarif_familial = 0.0203;
                break;
            case 8:
                tarif_collectif = 0.0203;
                tarif_familial = 0.0203;
                break;
            default:
                break;
        }
        result_collectif = (revenu * tarif_collectif / 100) / 12;
        result_familial = (revenu * tarif_familial / 100) / 12;
        $("#collectif").val(result_collectif.toFixed(2));
        $("#familial").val(result_familial.toFixed(2));
    };

    /* Application des calculs en direct */
    calcul();
    $("#revenu").on("input", calcul);
    $("input[name='option']:radio").change(calcul);
});
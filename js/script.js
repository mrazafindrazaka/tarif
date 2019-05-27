$(document).ready(function () {
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

    let calcul = function () {
        let revenu = parseFloat($("#revenu").val());
        let radio = parseInt($("input[name='option']:checked").val());
        let tarif_collectif = 0;
        let tarif_familial = 0;
        let result_collectif;
        let result_familial;

        if (!revenu)
            revenu = 687.30;
        if (revenu < 687.30)
            revenu = 687.30;
        else if (revenu > 4874.62)
            revenu = 4874.62;

        /*
        ** Taux pour le tarif collectif et familial par nombre d'enfants.
        **
        ** exemple: case 8 représente le taux pour 8 enfants et plus.
        */

        switch (radio) {
            case 1:
                tarif_collectif = 0.06;
                tarif_familial = 0.05;
                break;
            case 2:
                tarif_collectif = 0.05;
                tarif_familial = 0.04;
                break;
            case 3:
                tarif_collectif = 0.04;
                tarif_familial = 0.03;
                break;
            case 4:
                tarif_collectif = 0.03;
                tarif_familial = 0.03;
                break;
            case 5:
                tarif_collectif = 0.03;
                tarif_familial = 0.03;
                break;
            case 6:
                tarif_collectif = 0.03;
                tarif_familial = 0.02;
                break;
            case 7:
                tarif_collectif = 0.03;
                tarif_familial = 0.02;
                break;
            case 8:
                tarif_collectif = 0.02;
                tarif_familial = 0.02;
                break;
            default:
                break;
        }

        result_collectif = revenu * tarif_collectif / 100;
        result_familial = revenu * tarif_familial / 100;
        $("#collectif").val(result_collectif.toFixed(2));
        $("#familial").val(result_familial.toFixed(2));
    };
    calcul();
    $("#revenu").on("input", calcul);
    $("input[name='option']:radio").change(calcul);
});
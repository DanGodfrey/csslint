/*global CSSLint*/
CSSLint.addFormatter({
    //format information
    id: "lint-xml",
    name: "Lint XML format",

    /**
     * Return opening root XML tag.
     * @return {String} to prepend before all results
     */
    startFormat: function(){
        return "<?xml version=\"1.0\" ?>";
    },

    /**
     * Return closing root XML tag.
     * @return {String} to append after all results
     */
    endFormat: function(){
        return "";
    },

    /**
     * Given CSS Lint results for a file, return output for this format.
     * @param results {Object} with error and warning messages
     * @param filename {String} relative file path
     * @param options {Object} (UNUSED for now) specifies special handling of output
     * @return {String} output for results
     */
    formatResults: function(results, filename, options) {
        var messages = results.messages,
            output = [];

        /**
         * Replace special characters before write to output.
         *
         * Rules:
         *  - single quotes is the escape sequence for double-quotes
         *  - &lt; is the escape sequence for <
         *  - &gt; is the escape sequence for >
         * 
         * @param {String} message to escape
         * @return escaped message as {String}
         */
        var escapeSpecialCharacters = function(str) {
            if (!str || str.constructor !== String) {
                return "";
            }
            return str.replace(/\"/g, "'").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        };

        output.push("<testsuite name=\"CSSLint\" time=\"0.000\">");
        out.push("\t<testcase name=\"Generic CSSLint Test\"  time=\"0.000\"/>");        
        messages.forEach(function (message, i) {
            output.push("\t<testcase name=\"csslint."+filename+".issue#"+i+"\">");
            output.push("\t\t<failure message=\"line " + message.line + ", col " + message.col + ", " +
                     escapeSpecialCharacters(message.message) + "\">");
            output.push("\t\t</failure>");
            output.push("\t</testcase>");
        });
        output.push("</testsuite>");

        return output.join("");
    }
});
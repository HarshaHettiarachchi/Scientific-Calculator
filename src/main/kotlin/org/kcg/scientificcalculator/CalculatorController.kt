//Name  : Hettiarachchi Harsha Prabhath Chamara
//ID    :M25W7571
package org.kcg.scientificcalculator

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class CalculatorController {

    @GetMapping("/")
    fun home(): String {
        return "calculator"
    }
}